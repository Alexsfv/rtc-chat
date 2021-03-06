import { CallType, CreateOfferData, IceCandidateData, OfferData, OfferDataStatus, OfferPerson, socketService } from 'services';
import { rootState } from 'store';
import { callModalTitleRequest } from 'utils';
import { DisconnectOptions } from './types';

const serversConfig: RTCConfiguration = {
    iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
}

export class RTCService {
    localPeer: RTCPeerConnection | null = null
    dataChannel: RTCDataChannel | null = null

    setUpPeers = (callType: CallType) => {
        this.localPeer = new RTCPeerConnection(serversConfig)

        const handleConnectionChange = () => {
            const status = this.localPeer?.connectionState
            if (status === 'connected') {
                rootState.call.setIsConnected(true)
            } else if (status === 'disconnected' || status === 'failed') {
                rootState.call.setIsConnected(false)
            }
            console.log('Peers connected!', this.localPeer?.connectionState)
        }

        const handleCandidate = (e: RTCPeerConnectionIceEvent) => {
            const caller = rootState.call.caller
            if (e.candidate && caller) {
                console.log('handleCandidate', e);
                const candidateData: IceCandidateData = {
                    partnerId: caller.id,
                    candidate: e.candidate,
                }
                socketService.sendIceCandidate(candidateData)
            }
        }

        const handleDataChannel = (e: RTCDataChannelEvent) => {
            this.dataChannel = e.channel
            this.setUpDataChannel()
        }

        this.localPeer.addEventListener('icecandidate', handleCandidate)
        this.localPeer.addEventListener('connectionstatechange', handleConnectionChange)
        this.localPeer.addEventListener('datachannel', handleDataChannel)

        if (callType === 'VIDEO_PERSONAL' || callType === 'VIDEO_RANDOM') {
            this.setUpTracks()
        }
    }

    setUpTracks = () => {
        if (!this.localPeer) return null;
        const localStream = rootState.media.localStream

        const handleTrack = (e: RTCTrackEvent) => {
            console.log('handleTrack', e)
            rootState.media.remoteStream.addTrack(e.track)
        }

        this.localPeer.addEventListener('track', handleTrack)

        localStream.getTracks().forEach(t => {
            this.localPeer?.addTrack(t, localStream) as RTCRtpSender
        })
    }

    switchScreenTracks = () => {
        if (!this.localPeer) return null;
        const media = rootState.media
        if (media.isActiveScreen) {
            const localStream = media.localStream
            const senders = this.localPeer.getSenders()
            const localVideoTrack = localStream.getVideoTracks()[0]
            const videoSender = senders.find(s => s.track?.kind === localVideoTrack.kind)
            if (videoSender) {
                videoSender.replaceTrack(localVideoTrack)
                media.setIsActiveScreen(false)
            }
        } else {
            const screenStream = media.screenStream
            const senders = this.localPeer.getSenders()
            const screenVideoTrack = screenStream.getVideoTracks()[0]
            const videoSender = senders.find(s => s.track?.kind === screenVideoTrack.kind)
            if (videoSender) {
                videoSender.replaceTrack(screenVideoTrack)
                media.setIsActiveScreen(true)
            }
        }
    }

    setUpDataChannel = () => {
        if (!this.localPeer) {
            return null;
        }
        console.log('setUpDataChannel');
        if (!this.dataChannel) {
            this.dataChannel = this.localPeer.createDataChannel('message')
        }
        this.dataChannel.addEventListener('open', () => {
            console.log('open---')
            rootState.ui.setOpenedTypeSidebar('messenger')
        })
        this.dataChannel.addEventListener('close', () => {
            console.log('close---')
            rootState.ui.setOpenedTypeSidebar('connect')
        })
        this.dataChannel.addEventListener('message', (e) => {
            rootState.ui.addMessage({
                text: e.data,
                isOpposite: true,
            })
        })
    }

    sendMessage = (message: string) => {
        if (!this.dataChannel) return null;
        this.dataChannel.send(message)
    }

    createOffer = async ({ calleeId, callType, isRandom }: CreateOfferData) => {
        try {
            this.setUpPeers(callType)
            this.setUpDataChannel()
            const localPeer = this.localPeer as RTCPeerConnection

            const cancel = () => {
                this.disconnect()
                socketService.sendDisconnect(calleeId)
            }

            rootState.callModal.setData({
                title: isRandom ? 'Random calling' : 'Calling',
                description: isRandom ? '' : `Callee Id: ${calleeId}`,
                onClose: cancel,
                onReject: cancel,
            })
            rootState.callModal.setShow(true)

            const offer = await localPeer.createOffer()
            await localPeer.setLocalDescription(offer)
            socketService.sendOffer({
                status: 'WAIT_ANSWER',
                caller: {
                    id: rootState.media.personalCode,
                    sdp: localPeer.localDescription as RTCSessionDescription,
                },
                callee: {
                    id: calleeId,
                    sdp: null,
                },
                callType,
            })
        } catch (err) {
            console.error('create offer error:', err)
            rootState.callModal.setData({
                title: 'Create offer error',
                description: err + '',
                onAccept: null,
                onReject: null,
            })
        }
    }

    createRandomOffer = async (callType: CallType, prevRandomCalleeId: string = '') => {
        socketService.sendRandomOffer({
            calleeId: '',
            isRandom: true,
            callType,
            prevRandomCalleeId,
        })
    }

    handleOffer = async (data: OfferData) => {
        const isConnected = rootState.call.isConnected
        const isRandomCall = data.callType === 'VIDEO_RANDOM' || data.callType === 'CHAT_RANDOM'

        const decline = (status: OfferDataStatus) => () => {
            socketService.sendAnswer({
                ...data,
                status,
            })
        }
        if (isConnected && isRandomCall) {
            decline('BUSY_RANDOM')()
        } else if (!rootState.ui.allowRandomConnect && isRandomCall) {
            decline('NOT_ALLOWED_RANDOM')()
        } else if (isConnected) {
            decline('BUSY')()
        } else {
            rootState.callModal.setData({
                title: callModalTitleRequest(data.callType),
                onClose: decline('REJECTED'),
                onAccept: () => this.acceptOffer(data),
                onReject: decline('REJECTED'),
            })
            rootState.callModal.setShow(true)
        }
    }

    acceptOffer = async (data: OfferData) => {
        try {
            this.setUpPeers(data.callType)

            console.log('handled offer', data);
            if (this.localPeer && data.caller.sdp) {
                const call = rootState.call
                this.localPeer.setRemoteDescription(data.caller.sdp)
                const answer = await this.localPeer.createAnswer()
                this.localPeer.setLocalDescription(answer)
                call.setCaller(data.caller)
                call.setCallee({
                    ...data.callee,
                    sdp: answer
                })
                const answerWithCalleeSDP: OfferData = {
                    ...data,
                    status: 'ACCEPTED',
                    callee: call.callee as OfferPerson
                }
                socketService.sendAnswer(answerWithCalleeSDP)
            }
        } catch (err) {
            console.error('handle offer error:', err)
        }
    }

    handleAnswer = async (data: OfferData) => {
        try {
            console.log('sdp answer', data)
            if (data.status === 'BUSY_RANDOM' || data.status === 'NOT_ALLOWED_RANDOM') {
                this.disconnect({ resetModal: false })
                this.createRandomOffer(data.callType, data.callee.id)
                return null;
            }
            if (this.localPeer && data.callee.sdp && data.status === 'ACCEPTED') {
                const call = rootState.call
                call.setCaller(data.caller)
                call.setCallee(data.callee)
                await this.localPeer.setRemoteDescription(data.callee.sdp)
                rootState.callModal.setShow(false)
            } else {
                let title = ''
                if (data.status === 'REJECTED') title = 'Call has been rejected'
                if (data.status === 'BUSY') title = 'Callee is busy'
                rootState.callModal.reset()
                rootState.callModal.setData({ title })
                setTimeout(() => {
                    this.disconnect()
                    rootState.callModal.setShow(false)
                }, 1500)
            }
        } catch (err) {
            console.error('SDP handleAnswer errror:', err)
        }
    }

    handleIceCandidate = async (data: IceCandidateData) => {
        try {
            await this.localPeer?.addIceCandidate(data.candidate)
        } catch (err) {
            console.log('handleIceCandidate error:', err)
        }
    }

    disconnect = (options: DisconnectOptions = {}) => {
        const {
            resetModal = true,
        } = options

        const call = rootState.call
        rootState.call.setIsConnected(false)
        this.localPeer?.close()
        this.dataChannel?.close()
        this.localPeer = null
        this.dataChannel = null
        rootState.media.resetRemoteStream()
        rootState.media.setIsActiveScreen(false)
        rootState.ui.cleanMessages()
        call.setCaller(null)
        call.setCallee(null)
        if (resetModal) {
            rootState.callModal.setShow(false)
            rootState.callModal.reset()
        }
    }

    sendDisconnect = () => {
        const callerId = rootState.call.caller?.id
        const calleeId = rootState.call.callee?.id
        const isCaller = rootState.media.personalCode === callerId
        if (isCaller) {
            socketService.sendDisconnect(calleeId || '')
        } else {
            socketService.sendDisconnect(callerId || '')
        }
    }
}

export const rtcService = new RTCService()
import { IceCandidateData, OfferData, OfferDataStatus, OfferPerson, socketService } from 'services';
import { rootState } from 'store';
import { callModalTitleRequest } from 'utils';
import { Observer } from './Observer';

const serversConfig: RTCConfiguration = {
    iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
}

export class RTCService extends Observer {
    localPeer: RTCPeerConnection | null = null
    dataChannel: RTCDataChannel | null = null
    caller: OfferPerson | null = null
    callee: OfferPerson | null = null

    constructor() { super() }

    setUpPeers = () => {
        const localStream = rootState.media.localStream
        this.localPeer = new RTCPeerConnection(serversConfig)

        const handleConnectionChange = () => {
            if (this.localPeer?.connectionState === 'connected') {
                // this.setUpDataChannel()
            }
            console.log('Peers connected!', this.localPeer?.connectionState)
        }

        const handleCandidate = (e: RTCPeerConnectionIceEvent) => {
            if (e.candidate && this.caller) {
                console.log('handleCandidate', e);
                const candidateData: IceCandidateData = {
                    partnerId: this.caller.id,
                    candidate: e.candidate,
                }
                socketService.sendIceCandidate(candidateData)
            }
        }

        const handleTrack = (e: RTCTrackEvent) => {
            console.log('handleTrack', e)
            const tracksLength = rootState.media.remoteStream.getTracks().length
            console.log('handleTrack getTracks', rootState.media.remoteStream.getTracks());


            rootState.media.remoteStream.addTrack(e.track)
            rootState.media.setIsConnected(tracksLength !== 0)
        }

        const handleDataChannel = (e: RTCDataChannelEvent) => {
            this.dataChannel = e.channel
            this.setUpDataChannel()
        }

        this.localPeer.addEventListener('icecandidate', handleCandidate)
        this.localPeer.addEventListener('connectionstatechange', handleConnectionChange)
        this.localPeer.addEventListener('track', handleTrack)
        this.localPeer.addEventListener('datachannel', handleDataChannel)

        localStream.getTracks().forEach(t => this.localPeer?.addTrack(t, localStream))
    }

    setUpDataChannel = () => {
        if (!this.localPeer) return null;
        console.log('setUpDataChannel');
        if (!this.dataChannel) {
            this.dataChannel = this.localPeer.createDataChannel('message')
        }
        this.dataChannel.addEventListener('open', () => {
            rootState.ui.setOpenedTypeSidebar('messenger')
        })
        this.dataChannel.addEventListener('close', () => {
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

    createOffer = async (calleeId: string) => {
        try {
            this.setUpPeers()
            this.setUpDataChannel()
            const localPeer = this.localPeer as RTCPeerConnection

            rootState.callModal.setData({
                title: 'Calling',
                description: `Callee Id: ${calleeId}`,
                onClose: this.disconnect,
                onReject: this.disconnect,
            })
            rootState.callModal.setShow(true)

            const offer = await localPeer.createOffer()
            await localPeer.setLocalDescription(offer)
            socketService.sendOffer({
                callType: 'VIDEO_PERSONAL',
                status: 'WAIT_ANSWER',
                caller: {
                    id: rootState.media.personalCode,
                    sdp: localPeer.localDescription as RTCSessionDescription,
                },
                callee: {
                    id: calleeId,
                    sdp: null,
                }
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

    handleOffer = async (data: OfferData) => {
        const decline = (status: OfferDataStatus) => () => {
            socketService.sendAnswer({
                ...data,
                status,
            })
        }
        if (rootState.media.isConnected) {
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
            this.setUpPeers()
            // this.setUpDataChannel()

            console.log('handled offer', data);
            if (this.localPeer && data.caller.sdp) {
                this.localPeer.setRemoteDescription(data.caller.sdp)
                const answer = await this.localPeer.createAnswer()
                this.localPeer.setLocalDescription(answer)

                this.caller = data.caller
                this.callee = {
                    ...data.callee,
                    sdp: answer
                }

                const answerWithCalleeSDP: OfferData = {
                    ...data,
                    status: 'ACCEPTED',
                    callee: this.callee
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
            if (this.localPeer && data.callee.sdp && data.status === 'ACCEPTED') {
                this.caller = data.caller
                this.callee = data.callee
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

    disconnect = () => {
        rootState.media.setIsConnected(false)
        this.localPeer?.close()
        this.dataChannel?.close()
        this.localPeer = null
        this.dataChannel = null
        rootState.media.resetRemoteStream()
        rootState.callModal.setShow(false)
        rootState.callModal.reset()
        rootState.ui.cleanMessages()
        this.caller = null
    }

    sendDisconnect = () => {
        const isCaller = rootState.media.personalCode === this.caller?.id
        if (isCaller) {
            socketService.sendDisconnect(this.callee?.id || '')
        } else {
            socketService.sendDisconnect(this.caller?.id || '')
        }
    }
}

export const rtcService = new RTCService()
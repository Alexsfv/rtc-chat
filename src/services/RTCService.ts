import { IceCandidateData, OfferData, OfferPerson, socketService } from 'services';
import { rootState } from 'store';

const serversConfig: RTCConfiguration = {
    iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
}

export class RTCService {
    localPeer: RTCPeerConnection | null = null
    caller: OfferPerson | null = null

    setUpPeers = (localStream: MediaStream) => {
        this.localPeer = new RTCPeerConnection(serversConfig)

        const handleConnectionChange = () => {
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
            rootState.media.remoteStream.addTrack(e.track)
            rootState.media.setIsConnected(tracksLength !== 0)
        }

        this.localPeer.addEventListener('icecandidate', handleCandidate)
        this.localPeer.addEventListener('connectionstatechange', handleConnectionChange)
        this.localPeer.addEventListener('track', handleTrack)

        localStream.getTracks().forEach(t => this.localPeer?.addTrack(t, localStream))
    }

    createOffer = async (calleeId: string) => {
        try {
            if (!this.localPeer) {
                console.log('localPeer is not created', this.localPeer);
                return null
            };

            const offer = await this.localPeer.createOffer()
            await this.localPeer.setLocalDescription(offer)
            socketService.sendOffer({
                callType: 'VIDEO_PERSONAL',
                caller: {
                    id: rootState.media.personalCode,
                    sdp: this.localPeer.localDescription as RTCSessionDescription,
                },
                callee: {
                    id: calleeId,
                    sdp: null,
                }
            })
        } catch (err) {
            console.error('create offer error:', err)
        }
    }

    handleOffer = async (data: OfferData) => {
        try {
            console.log('handled offer', data);
            if (this.localPeer && data.caller.sdp) {
                this.caller = data.caller

                this.localPeer.setRemoteDescription(data.caller.sdp)
                const answer = await this.localPeer.createAnswer()
                this.localPeer.setLocalDescription(answer)
                const answerWithCalleeSDP = {
                    ...data,
                    callee: {
                        ...data.callee,
                        sdp: answer
                    }
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
            if (this.localPeer && data.callee.sdp) {
                this.caller = data.caller
                await this.localPeer.setRemoteDescription(data.callee.sdp)
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
        this.caller = null
        rootState.media.setIsConnected(false)
        rootState.media.remoteStream.getTracks().forEach(track => {
            track.stop()
        })
        // добавить event disconnect в websocket
        // // перенести создание localPeer в ф-цию запроса вызова
        // // при disconnect очищать localPeer, т.к. не нашел способа чистоть
        // this.localPeer?.setRemoteDescription
    }

    handleDisconnect = () => {
        // ловим отключение на второй стороне
    }
}

export const rtcService = new RTCService()
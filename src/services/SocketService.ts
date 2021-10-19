import { CreateOfferData, DisconnectPeer, IceCandidateData, OfferData } from 'services'
import io, { Socket } from 'socket.io-client'
import { rootState } from 'store'
import { rtcService } from './index'


class SocketService {
    socket: Socket | null = null

    connect = () => {
        this.socket = io('ws://localhost:3000')
        this.socket.on('connect', this.initSubscribers)
    }

    initSubscribers = () => {
        this.socket?.on('hello', () => {
            console.log('Hello');
        })
        this.socket?.on('setPersonalCode', (code: string) => {
            rootState.media.setPersonalCode(code)
        })
        this.socket?.on('sendOfferSDP', (data: OfferData) => {
            rtcService.handleOffer(data)
        })
        this.socket?.on('sendAnswerSDP', (data: OfferData) => {
            rtcService.handleAnswer(data)
        })
        this.socket?.on('sendIceCandidate', (data: IceCandidateData) => {
            rtcService.handleIceCandidate(data)
        })
        this.socket?.on('sendRandomOffer', (data: CreateOfferData) => {
            rtcService.createOffer(data)
        })
        this.socket?.on('peerDisconnect', () => {
            rtcService.disconnect()
        })
    }

    sendIceCandidate = (data: IceCandidateData) => {
        this.socket?.emit('sendIceCandidate', data)
    }

    sendOffer = (data: OfferData) => {
        this.socket?.emit('sendOfferSDP', data)
        console.log('sendOfferSDP')
    }

    sendRandomOffer = (data: CreateOfferData) => {
        this.socket?.emit('sendRandomOffer', data)
    }

    sendAnswer = (data: OfferData) => {
        this.socket?.emit('sendAnswerSDP', data)
        console.log('sendAnswerSDP')
    }

    sendDisconnect = (partnerId: string) => {
        this.socket?.emit('peerDisconnect', {partnerId})
    }
}

export const socketService = new SocketService()
export type CallType = 'VIDEO_PERSONAL' | 'CHAT_PERSONAL' | 'VIDEO_RANDOM' | 'CHAT_RANDOM'
export type OfferDataStatus = 'ACCEPTED' | 'REJECTED' | 'BUSY' | 'WAIT_ANSWER' | 'BUSY_RANDOM' | 'NOT_ALLOWED_RANDOM'

export interface OfferPerson {
    id: string
    sdp: RTCSessionDescriptionInit | null
}

export interface OfferData {
    callType: CallType
    caller: OfferPerson
    callee: OfferPerson
    status: OfferDataStatus
}

export interface DisconnectPeer {
    partnerId: string
}

export interface IceCandidateData {
    partnerId: string
    candidate: RTCIceCandidate
}

export interface CreateOfferData {
    callType: CallType
    calleeId: string
    isRandom?: boolean
}

export interface DisconnectOptions {
    resetModal?: boolean
}
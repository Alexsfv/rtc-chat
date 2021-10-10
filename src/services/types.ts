export type CallType = 'VIDEO_PERSONAL' | 'CHAT_PERSONAL' | 'VIDEO_RANDOM' | 'CHAT_RANDOM'

export interface OfferPerson {
    id: string
    sdp: RTCSessionDescriptionInit | null
}

export interface OfferData {
    callType: CallType
    caller: OfferPerson
    callee: OfferPerson
}

export interface IceCandidateData {
    partnerId: string
    candidate: RTCIceCandidate
}
import { makeAutoObservable, action } from 'mobx'
import { OfferData, OfferPerson } from 'services'


class CallStore {
    offer: OfferData | null = null
    isConnected: boolean = false
    caller: OfferPerson | null = null
    callee: OfferPerson | null = null

    constructor() {
        makeAutoObservable(
            this,
            {
                setOffer: action.bound,
                setIsConnected: action.bound,
                setCaller: action.bound,
                setCallee: action.bound,
            }
        )
    }

    setOffer = (data: OfferData | null) => {
        this.offer = data
    }

    setIsConnected = (val: boolean) => {
        this.isConnected = val
    }

    setCaller = (data: OfferPerson | null) => {
        this.caller = data
    }

    setCallee = (data: OfferPerson | null) => {
        this.callee = data
    }
}

export const callState = new CallStore()
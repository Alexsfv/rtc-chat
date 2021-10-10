
import { makeAutoObservable, action, runInAction } from 'mobx'

class MediaStore {
    localStream: MediaStream = new MediaStream()
    remoteStream: MediaStream = new MediaStream()
    personalCode: string = ""
    isConnected: boolean = false

    constructor() {
        makeAutoObservable(
            this,
            {
                receiveLocalStream: action.bound,
                setPersonalCode: action.bound,
                setIsConnected: action.bound,
            }
        )
    }

    receiveLocalStream = async () => {
        try {
            const constraints = { audio: true, video: true }
            const stream = await window.navigator.mediaDevices.getUserMedia(constraints)
            runInAction(() => {
                this.localStream = stream
            })
        } catch (err) {
            console.log('setLocalStream - Error: ', err);
        }
    }

    setPersonalCode = (val: string) => {
        this.personalCode = val
    }

    setIsConnected = (val: boolean) => {
        this.isConnected = val
    }
}

export const mediaState = new MediaStore()
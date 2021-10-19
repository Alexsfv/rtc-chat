
import { makeAutoObservable, action, runInAction } from 'mobx'

class MediaStore {
    localStream: MediaStream = new MediaStream()
    remoteStream: MediaStream = new MediaStream()
    personalCode: string = ""

    constructor() {
        makeAutoObservable(
            this,
            {
                receiveLocalStream: action.bound,
                setPersonalCode: action.bound,
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

    resetRemoteStream = () => {
        this.remoteStream = new MediaStream()
    }
}

export const mediaState = new MediaStore()

import { makeAutoObservable, action } from 'mobx'

class MediaStore {
    localStream: MediaStream | null = null

    constructor() {
        makeAutoObservable(
            this,
            {
                receiveLocalStream: action.bound,
            }
        )
    }

    receiveLocalStream = async () => {
        try {
            const constraints = {audio: true, video: true}
            const stream = await window.navigator.mediaDevices.getUserMedia(constraints)
            this.localStream = stream
        } catch (err) {
            console.log('setLocalStream - Error: ', err);
            this.localStream = null
        }
    }
}

export const mediaState = new MediaStore()
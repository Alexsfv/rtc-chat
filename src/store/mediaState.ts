
import { makeAutoObservable, action, runInAction } from 'mobx'

class MediaStore {
    localStream: MediaStream = new MediaStream()
    remoteStream: MediaStream = new MediaStream()
    screenStream: MediaStream = new MediaStream()
    personalCode: string = ""
    isActiveScreen: boolean = false
    isRecordingStream: boolean = false
    isRecordingStreamPause: boolean = false

    constructor() {
        makeAutoObservable(
            this,
            {
                receiveLocalStream: action.bound,
                setPersonalCode: action.bound,
                resetRemoteStream: action.bound,
                captureScreen: action.bound,
                setIsActiveScreen: action.bound,
                setIsRecordingStream: action.bound,
                setIsRecordingStreamPause: action.bound,
            }
        )
    }

    receiveLocalStream = async () => {
        try {
            const constraints = { audio: true, video: true }
            console.log('stream getting began');

            const stream = await window.navigator.mediaDevices.getUserMedia(constraints)
            console.log('stream getting ends', stream);
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

    captureScreen = async (): Promise<boolean> => {
        try {
            const options: DisplayMediaStreamConstraints = {
                video: true,
                audio: true
            }
            const screen = await navigator.mediaDevices.getDisplayMedia(options)
            runInAction(() => this.screenStream = screen)
            return true
        } catch (err) {
            console.error('Capture screen error: ', err)
            return false
        }
    }

    setIsActiveScreen = (val: boolean) => {
        this.isActiveScreen = val
    }

    setIsRecordingStream = (val: boolean) => {
        this.isRecordingStream = val
    }

    setIsRecordingStreamPause = (val: boolean) => {
        this.isRecordingStreamPause = val
    }
}

export const mediaState = new MediaStore()
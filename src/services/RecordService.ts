

class RecordService {
    recorder: MediaRecorder | null = null
    buffer: Blob[] = []

    recordStream = (stream: MediaStream) => {
        const options: MediaRecorderOptions  = {mimeType: 'video/webm; codecs=vp9'}
        this.recorder = new MediaRecorder(stream, options)
        this.initListeners()
        this.recorder.start(500)
        console.log(this.recorder);
    }

    pause = () => {
        if (!this.recorder) return null;
        this.recorder.pause()
    }

    resume = () => {
        if (!this.recorder) return null;
        this.recorder.resume()
    }

    stopRecording = () => {
        this.recorder?.stop()
        setTimeout(() => {
            this.download()
            this.buffer = []
            this.recorder = null
        }, 1500)
    }

    download = () => {
        const blob = new Blob(this.buffer, {type: 'video/webm'})
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'Record'
        a.target = '_blank'
        a.click()
    }

    initListeners = () => {
        if (!this.recorder) return null;
        this.recorder.ondataavailable = (e: BlobEvent) => {
            if (e.data.size > 0) {
                this.buffer.push(e.data)
            }
        }
    }
}

export const recordService = new RecordService()
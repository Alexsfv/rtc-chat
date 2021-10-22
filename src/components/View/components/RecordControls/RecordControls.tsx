import { Control, Wrapper } from './RecordControls.styled'
import { observer } from 'mobx-react-lite'
import { rootState } from 'store'
import { recordService } from 'services'
import { useEffect } from 'react'

export const RecordControls: React.FC<{}> = observer(() => {

    const media = rootState.media
    const call = rootState.call

    const handlePause = () => {
        recordService.pause()
        media.setIsRecordingStreamPause(true)
    }

    const handleResume = () => {
        recordService.resume()
        media.setIsRecordingStreamPause(false)
    }

    const handleStop = () => {
        recordService.stopRecording()
        media.setIsRecordingStream(false)
    }

    useEffect(() => {
        if (!call.isConnected && media.isRecordingStream) {
            handleStop()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [call.isConnected])

    if (!media.isRecordingStream) {
        return null
    }

    return (
        <Wrapper>
            {
                media.isRecordingStreamPause
                    ? <Control onClick={handleResume}>
                        <i className="fa fa-play" />
                    </Control>
                    : <Control onClick={handlePause}>
                        <i className="fa fa-pause" />
                    </Control>
            }
            <Control onClick={handleStop}>
                <i className="fa fa-stop" />
            </Control>
        </Wrapper>
    )
})
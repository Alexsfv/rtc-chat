import { RemoteVideoProps } from "./RemoteVideo.types"
import { Wrapper } from './RemoteVideo.styled'
import { observer } from 'mobx-react-lite'
import { rootState } from 'store'
import { useEffect, useRef } from 'react'

export const RemoteVideo: React.FC<RemoteVideoProps> = observer(() => {

    const media = rootState.media
    const call = rootState.call

    const videoRef = useRef<HTMLVideoElement>(null)

    const hasRemoteVideo = Boolean(media.remoteStream.getVideoTracks()[0])

    useEffect(() => {
        const video = videoRef.current
        if (video) {
            video.srcObject = media.remoteStream
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [call.isConnected])

    return (
        <Wrapper>
            {
                hasRemoteVideo &&
                <video
                    className="video"
                    ref={videoRef}
                    loop
                    muted
                    autoPlay
                />
            }
        </Wrapper>
    )
})
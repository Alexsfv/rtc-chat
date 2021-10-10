import { RemoteVideoProps } from "./RemoteVideo.types"
import { Wrapper, Video } from './RemoteVideo.styled'
import { observer } from 'mobx-react-lite'
import { rootState } from 'store'
import { useEffect, useRef } from 'react'

export const RemoteVideo: React.FC<RemoteVideoProps> = observer(() => {

    const media = rootState.media

    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        const video = videoRef.current
        if (video) {
            video.srcObject = media.remoteStream
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [media.isConnected])

    return (
        <Wrapper>
            <Video
                ref={videoRef}
                loop
                muted
                autoPlay
            />
        </Wrapper>
    )
})
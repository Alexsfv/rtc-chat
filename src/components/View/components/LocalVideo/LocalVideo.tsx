import { LocalVideoProps } from "./LocalVideo.types"
import { Wrapper } from './LocalVideo.styled'
import { observer } from 'mobx-react-lite'
import { rootState } from 'store'
import { useEffect, useRef } from 'react'

export const LocalVideo: React.FC<LocalVideoProps> = observer((props) => {

    const media = rootState.media
    const videoRef = useRef<HTMLVideoElement>(null)

    const hasLocalVideo = Boolean(media.localStream.getVideoTracks()[0])

    useEffect(() => {
        media.receiveLocalStream()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        const video = videoRef.current
        if (video) {
            video.srcObject = media.isActiveScreen ? media.screenStream : media.localStream
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [media.localStream, media.isActiveScreen])

    return (
        <Wrapper>
            {
                hasLocalVideo &&
                <video
                    className="video"
                    ref={videoRef}
                    loop
                    muted
                    autoPlay
                    {...props}
                />
            }
        </Wrapper>
    )
})
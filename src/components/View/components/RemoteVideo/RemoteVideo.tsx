import { RemoteVideoProps } from "./RemoteVideo.types"
import { Wrapper, Video } from './RemoteVideo.styled'

export const RemoteVideo: React.FC<RemoteVideoProps> = () => {

    return (
        <Wrapper>
            <Video
                src="/static/video/cat.mp4"
                loop
                muted
                autoPlay
            />
        </Wrapper>
    )
}
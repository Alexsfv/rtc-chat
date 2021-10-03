import { LocalVideoProps } from "./LocalVideo.types"
import { Wrapper, Video } from './LocalVideo.styled'

export const LocalVideo: React.FC<LocalVideoProps> = (props) => {

    return (
        <Wrapper>
            <Video
                src="/static/video/cat.mp4"
                loop
                muted
                autoPlay
                {...props}
            />
        </Wrapper>
    )
}
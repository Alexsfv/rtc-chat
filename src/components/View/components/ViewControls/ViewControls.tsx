import { ViewControlsProps } from "./ViewControls.types"
import { CallControl } from '@Components'
import { Wrapper } from './ViewControls.styled'
import { useState } from "react"
import { observer } from 'mobx-react-lite'
import { rootState } from 'store'
import { rtcService } from 'services'
import { hasTrack } from 'utils'

export const ViewControls: React.FC<ViewControlsProps> = observer(() => {

    const media = rootState.media
    const [activeMicro, setActiveMicro] = useState(true)

    const switchTrack = (kind: MediaStreamTrack['kind']) => {
        media.localStream.getTracks().forEach(track => {
            if (track.kind === kind) {
                track.enabled = !track.enabled
            }
        })
    }

    const handleMicro = () => {
        setActiveMicro(!activeMicro)
        switchTrack('audio')
    }

    const handleVideo = () => {
        switchTrack('video')
    }

    const handleHangUp = () => {
        rtcService.sendDisconnect()
        rtcService.disconnect()
    }

    return (
        <Wrapper>
            {
                hasTrack(media.remoteStream, 'audio') &&
                <CallControl onClick={handleMicro}>
                    <i className={`fa fa-microphone${activeMicro ? '' : "-slash"} icon`} />
                </CallControl>
            }
            {
                hasTrack(media.remoteStream, 'video') &&
                <CallControl onClick={handleVideo}>
                    <i className="fa fa-camera icon"></i>
                </CallControl>
            }
            <CallControl
                size="large"
                color="red"
                onClick={handleHangUp}
            >
                <i className="fa fa-phone icon-large"></i>
            </CallControl>
            <CallControl>
                <i className="fa fa-desktop icon"></i>
            </CallControl>
            {
                hasTrack(media.remoteStream, 'video') &&
                <CallControl>
                    <i className="fa fa-bullseye icon"></i>
                </CallControl>
            }
        </Wrapper>
    )
})
import { ViewControlsProps } from "./ViewControls.types"
import { CallControl } from '@Components'
import { Wrapper } from './ViewControls.styled'
import { useState } from "react"
import { observer } from 'mobx-react-lite'
import { rootState } from 'store'
import { rtcService } from 'services'

export const ViewControls: React.FC<ViewControlsProps> = observer(() => {

    const media = rootState.media
    const [activeMicro, setActiveMicro] = useState(true)

    const handleMicro = () => {
        setActiveMicro(!activeMicro)
        media.localStream.getTracks().forEach(track => {
            if (track.kind === 'video') {
                track.enabled = !activeMicro
            }
        })
    }



    return (
        <Wrapper>
            <CallControl onClick={handleMicro}>
                <i className={`fa fa-microphone${activeMicro ? '' : "-slash"} icon`} />
            </CallControl>
            <CallControl>
                <i className="fa fa-camera icon"></i>
            </CallControl>
            <CallControl
                size="large"
                color="red"
                onClick={rtcService.disconnect}
            >
                <i className="fa fa-phone icon-large"></i>
            </CallControl>
            <CallControl>
                <i className="fa fa-desktop icon"></i>
            </CallControl>
            <CallControl>
                <i className="fa fa-bullseye icon"></i>
            </CallControl>
        </Wrapper>
    )
})
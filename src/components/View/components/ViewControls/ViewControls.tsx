import { ViewControlsProps } from "./ViewControls.types"
import { CallControl } from '@Components'
import {Wrapper} from './ViewControls.styled'
import { useState } from "react"

export const ViewControls: React.FC<ViewControlsProps> = () => {
    const [activeMicro, setActiveMicro] = useState(true)

    return (
        <Wrapper>
            <CallControl onClick={() => setActiveMicro(!activeMicro)}>
                <i className={`fa fa-microphone${activeMicro ? '' : "-slash"} icon`}/>
            </CallControl>
            <CallControl>
                <i className="fa fa-camera icon"></i>
            </CallControl>
            <CallControl size="large" color="red">
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
}
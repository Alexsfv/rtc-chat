import { ViewControlsProps } from "./ViewControls.types"
import { CallControl } from '@Components'
import {Wrapper} from './ViewControls.styled'

export const ViewControls: React.FC<ViewControlsProps> = () => {

    return (
        <Wrapper>
            <CallControl>
                <i className="fa fa-microphone-slash"></i>
                {/* <i className="fa fa-microphone"></i> */}
            </CallControl>
            <CallControl>
                <i className="fa fa-camera"></i>
            </CallControl>
            <CallControl size="large" color="red">
                <i className="fa fa-phone"></i>
            </CallControl>
            <CallControl>
                <i className="fa fa-desktop"></i>
            </CallControl>
            <CallControl>
                <i className="fa fa-bullseye"></i>
            </CallControl>
        </Wrapper>
    )
}
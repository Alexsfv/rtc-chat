import { Control, Wrapper } from './RecordControls.styled'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { rootState } from 'store'

export const RecordControls: React.FC<{}> = observer(() => {

    const call = rootState.call

    const [isRecording, setIsRecording] = useState(false)

    if (!call.isConnected) {
        return null
    }

    return (
        <Wrapper>
            {
                isRecording
                    ? <Control onClick={() => setIsRecording(false)}>
                        <i className="fa fa-pause" />
                    </Control>
                    : <Control onClick={() => setIsRecording(true)}>
                        <i className="fa fa-play" />
                    </Control>
            }
            <Control>
                <i className="fa fa-stop" />
            </Control>
        </Wrapper>
    )
})
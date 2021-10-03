import { Control, Wrapper } from './RecordControls.styled'
import { observer } from 'mobx-react-lite'
import { rootState } from 'store'
import { useState } from 'react'

export const RecordControls: React.FC<{}> = observer(() => {

    const [isRecording, setIsRecording] = useState(false)

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
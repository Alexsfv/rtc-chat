import React from 'react'
import { LocalVideo } from './components/LocalVideo/LocalVideo'
import { Placeholder } from './components/Placeholder'
import { RecordControls } from './components/RecordControls'
import { RemoteVideo } from './components/RemoteVideo'
import { SidebarBtn } from './components/SidebarBtn'
import { ViewControls } from './components/ViewControls'
import { Wrapper } from './View.styled'
import { observer } from 'mobx-react-lite'
import { rootState } from 'store'

export const View: React.FC<{}> = observer(() => {

    const media = rootState.media

    return (
        <Wrapper>
            <SidebarBtn />
            <RecordControls />
            <LocalVideo />
            <Placeholder />
            {
                media.isConnected && <>
                    <RemoteVideo />
                    <ViewControls />
                </>
            }
        </Wrapper>
    )
})
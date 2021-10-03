import React, { useState } from 'react'
import { LocalVideo } from './components/LocalVideo/LocalVideo'
import { Placeholder } from './components/Placeholder'
import { RecordControls } from './components/RecordControls'
import { RemoteVideo } from './components/RemoteVideo'
import { SidebarBtn } from './components/SidebarBtn'
import { ViewControls } from './components/ViewControls'
import { Wrapper } from './View.styled'

export const View: React.FC<{}> = () => {
    const [hasRemoteVideo, setRemoteVideo] = useState(false)

    return (
        <Wrapper>
            <SidebarBtn />
            <RecordControls />
            <LocalVideo onClick={() => setRemoteVideo(!hasRemoteVideo)} />
            <Placeholder />
            {
                hasRemoteVideo && <>
                    <RemoteVideo />
                    <ViewControls />
                </>
            }
        </Wrapper>
    )
}
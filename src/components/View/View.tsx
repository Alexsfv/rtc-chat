import React, { useState } from 'react'
import { LocalVideo } from './components/LocalVideo/LocalVideo'
import { Placeholder } from './components/Placeholder'
import { RemoteVideo } from './components/RemoteVideo'
import { ViewControls } from './components/ViewControls'
import { Wrapper } from './View.styled'

export const View: React.FC<{}> = () => {
    const [hasRemoteVideo, setRemoteVideo] = useState(false)
    console.log('hasRemoteVideo', hasRemoteVideo);


    return (
        <Wrapper>
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
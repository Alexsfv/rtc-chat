import React from 'react'
import { ConnectBar } from './components/ConnectBar/ConnectBar'
import {Wrapper} from './Sidebar.styled'

export const Sidebar: React.FC<{}> = () => {

    return (
        <Wrapper>
            <ConnectBar />
        </Wrapper>
    )
}
import React from 'react'
import { BarSwitcher } from './components/BarSwitcher/BarSwitcher'
import { ConnectBar } from './components/ConnectBar/ConnectBar'
import { MessengerBar } from './components/MessengerBar'
import { Body, Wrapper, Background } from './Sidebar.styled'
import { observer } from 'mobx-react-lite'
import { rootState } from '@Store'

export const Sidebar: React.FC<{}> = observer(() => {
    const uiState = rootState.ui

    return (
        <Wrapper opened={uiState.openedSideBar}>
            <Background onClick={() => uiState.setOpenedSidebar(false)} />
            <Body opened={uiState.openedSideBar}>
                {
                    uiState.openedTypeSidebar === "connect" &&
                    <ConnectBar />
                }
                {
                    uiState.openedTypeSidebar === "messenger" &&
                    <MessengerBar />
                }
                <BarSwitcher />
            </Body>
        </Wrapper>
    )
})
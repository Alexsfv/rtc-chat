import { BarSwitcherProps } from "./BarSwitcher.types"
import { SwitchButton, Wrapper } from './BarSwitcher.styled'
import { observer } from 'mobx-react-lite'
import { rootState } from "store"

export const BarSwitcher: React.FC<BarSwitcherProps> = observer(() => {
    const uiState = rootState.ui

    return (
        <Wrapper>
            <SwitchButton
                active={uiState.openedTypeSidebar === "connect"}
                onClick={() => uiState.setOpenedTypeSidebar("connect")}
            >
                <i className="fa fa-users" />
            </SwitchButton>
            <SwitchButton
                active={uiState.openedTypeSidebar === "messenger"}
                onClick={() => uiState.setOpenedTypeSidebar("messenger")}
            >
                <i className="fa fa-paper-plane-o" />
            </SwitchButton>
        </Wrapper>
    )
})
import { CallControl } from 'components'
import { Wrapper } from './SidebarBtn.styled'
import { observer } from 'mobx-react-lite'
import { rootState } from 'store'

export const SidebarBtn: React.FC<{}> = observer(() => {

    const handleClick = () => {
        rootState.ui.setOpenedSidebar(true)
    }

    return (
        <Wrapper>
            <CallControl onClick={handleClick}>
                <i className="fa fa-bars" />
            </CallControl>
        </Wrapper>
    )
})
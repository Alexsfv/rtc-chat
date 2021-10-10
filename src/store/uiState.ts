import { SwitchBars } from "components/Sidebar/components/BarSwitcher/BarSwitcher.types"
import { makeAutoObservable, action } from "mobx"

class UIStore {
    openedSideBar: boolean = false
    openedTypeSidebar: SwitchBars = "connect"

    constructor() {
        makeAutoObservable(this, {
            setOpenedSidebar: action.bound,
            setOpenedTypeSidebar: action.bound,
        })
    }

    setOpenedSidebar = (val: boolean) => {
        this.openedSideBar = val
    }

    setOpenedTypeSidebar = (val: SwitchBars) => {
        this.openedTypeSidebar = val
    }


}

export const UIState = new UIStore()
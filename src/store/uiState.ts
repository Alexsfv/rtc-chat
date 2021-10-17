import { SwitchBars } from "components/Sidebar/components/BarSwitcher/BarSwitcher.types"
import { makeAutoObservable, action } from "mobx"

export interface MessageChat {
    text: string
    isOpposite: boolean
}

class UIStore {
    openedSideBar: boolean = false
    openedTypeSidebar: SwitchBars = "connect"
    messages: MessageChat[] = []

    constructor() {
        makeAutoObservable(this, {
            setOpenedSidebar: action.bound,
            setOpenedTypeSidebar: action.bound,
            addMessage: action.bound,
            cleanMessages: action.bound,
        })
    }

    setOpenedSidebar = (val: boolean) => {
        this.openedSideBar = val
    }

    setOpenedTypeSidebar = (val: SwitchBars) => {
        this.openedTypeSidebar = val
    }

    addMessage = (message: MessageChat) => {
        this.messages.push(message)
    }

    cleanMessages = () => {
        this.messages = []
    }
}

export const UIState = new UIStore()
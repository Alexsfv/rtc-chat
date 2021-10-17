import { makeAutoObservable, action } from 'mobx'

type AnswerCallback = (() => void) | null
interface ICallModalStore {
    isShow: boolean
    title: string
    description: string
    onAccept: AnswerCallback
    onReject: AnswerCallback
    onClose: AnswerCallback
}

export class CallModalStore implements ICallModalStore {
    isShow = false
    title = ''
    description = ''
    onAccept = null as AnswerCallback
    onReject = null as AnswerCallback
    onClose = null as AnswerCallback

    constructor() {
        makeAutoObservable(
            this,
            {
                setData: action.bound,
                setShow: action.bound,
                reset: action.bound,
            }
        )
    }

    setData = (data: Partial<ICallModalStore>) => {
        this.title = data.title || ''
        this.description = data.description || ''
        this.onAccept = data.onAccept || null
        this.onReject = data.onReject || null
        this.onClose = data.onClose || null
    }

    setShow = (val: boolean) => {
        this.isShow = val
    }

    reset = () => {
        this.title = ''
        this.description = ''
        this.onAccept = null
        this.onReject = null
        this.onClose = null
    }
}

export const callModalState = new CallModalStore()
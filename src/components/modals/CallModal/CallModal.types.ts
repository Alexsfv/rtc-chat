export interface CallModalProps {
    title: string
    description?: string
    onAccept?: () => void
    onReject?: () => void
    onClose?: () => void
}
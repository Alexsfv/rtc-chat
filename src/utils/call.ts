import { CallType } from 'services';

export const callModalTitleRequest = (callType: CallType) => {
    if (callType === 'CHAT_PERSONAL' || callType === 'CHAT_RANDOM') {
        return 'Chat calling'
    }
    if (callType === 'VIDEO_PERSONAL' || callType === 'VIDEO_RANDOM') {
        return 'Video calling'
    }
    return ''
}
import { mediaState } from './mediaState';
import { UIState } from "./uiState";
import { callModalState } from "./callModalState";
import { callState } from "./callState";

export const rootState = {
    ui: UIState,
    media: mediaState,
    callModal: callModalState,
    call: callState,
}
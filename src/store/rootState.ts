import { mediaState } from './mediaState';
import { UIState } from "./uiState";
import { callModalState } from "./callModalState";

export const rootState = {
    ui: UIState,
    media: mediaState,
    callModal: callModalState,
}
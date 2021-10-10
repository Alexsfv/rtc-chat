import { mediaState } from './mediaState';
import { UIState } from "./uiState";

export const rootState = {
    ui: UIState,
    media: mediaState,
}
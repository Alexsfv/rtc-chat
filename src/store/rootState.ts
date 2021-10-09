import { mediaState } from './media';
import { UIState } from "./uiState";

export const rootState = {
    ui: UIState,
    media: mediaState,
}
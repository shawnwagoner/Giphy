export const SET_SEARCH = "Set Search";
export const CLEAR_SEARCH = "Clear Search";

export const INITIAL_SEARCH_STATE = [];

export function searchReducer(action, state) {
    switch(action.type) {
        case SET_SEARCH:
            return action.payload;
        case CLEAR_SEARCH:
            return INITIAL_SEARCH_STATE;
        default:
            return state;
    }
}
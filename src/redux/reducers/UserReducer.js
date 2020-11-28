import { actionType } from "../ActionType";

const INITIAL_STATE = {
    data: null,
    isLoading: false,
    error: null
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionType.LOAD_USER_START:
            return Object.assign({}, state, { isLoading: true });
        case actionType.LOAD_USER_SUCCESS:
            return Object.assign({}, state, { data: action.payload, isLoading: false });
        case actionType.LOAD_USER_FAILURE:
            return Object.assign({}, state, { error: action.payload, isLoading: false });
        default:
            return state;
    }
};

export default userReducer;

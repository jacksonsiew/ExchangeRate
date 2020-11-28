import { constantType } from "../ActionType";

const INITIAL_STATE = {
    /** OUTSTANDING */
    data: null,
    isLoadingConstant: false,
    errorConstant: null,
    isLoadingFreeCreditConstant: false,
    errorFreeCreditConstant: null
};

const dashboardReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        /** DASHBOARD */
        case constantType.LOAD_DASHBOARD_CONSTANT_START:
            return Object.assign({}, state, { isLoadingConstant: true });
        case constantType.LOAD_DASHBOARD_CONSTANT_SUCCESS:
            return Object.assign({}, state, {
                data: action.payload,
                isLoadingConstant: false
            });
        case constantType.LOAD_DASHBOARD_CONSTANT_FAILURE:
            return Object.assign({}, state, {
                errorConstant: action.payload,
                isLoadingConstant: false
            });
        case constantType.LOAD_DASHBOARD_CONSTANT_END:
            return Object.assign({}, state, { isLoadingConstant: false });

        /** FREE CREDIT */
        case constantType.LOAD_FREE_CREDIT_CONSTANT_START:
            return Object.assign({}, state, { isLoadingFreeCreditConstant: true });
        case constantType.LOAD_FREE_CREDIT_CONSTANT_SUCCESS:
            return Object.assign({}, state, {
                isLoadingFreeCreditConstant: false
            });
        case constantType.LOAD_FREE_CREDIT_CONSTANT_FAILURE:
            return Object.assign({}, state, {
                errorFreeCreditConstant: action.payload,
                isLoadingFreeCreditConstant: false
            });
        case constantType.LOAD_FREE_CREDIT_CONSTANT_END:
            return Object.assign({}, state, { isLoadingFreeCreditConstant: false });

        default:
            return state;
    }
};

export default dashboardReducer;

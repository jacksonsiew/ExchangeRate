import { actionType } from "../ActionType";

const INITIAL_STATE = {
    historyList: null,
    isHistoryLoading: false,
    historyError: null,
    ratesList: null,
    isRatesLoading: false,
    ratesError: null,
};

const exchangeReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionType.LOAD_EXCHANGE_HISTORY_START:
            return Object.assign({}, state, { isHistoryLoading: true });
        case actionType.LOAD_EXCHANGE_HISTORY_SUCCESS:
            return Object.assign({}, state, { historyList: action.payload, isHistoryLoading: false });
        case actionType.LOAD_EXCHANGE_HISTORY_FAILURE:
            return Object.assign({}, state, { historyError: action.payload, isHistoryLoading: false });
        case actionType.LOAD_RATES_START:
            return Object.assign({}, state, { isRatesLoading: true });
        case actionType.LOAD_RATES_SUCCESS:
            return Object.assign({}, state, { ratesList: action.payload, isRatesLoading: false });
        case actionType.LOAD_RATES_FAILURE:
            return Object.assign({}, state, { ratesError: action.payload, isRatesLoading: false });
        default:
            return state;
    }
};

export default exchangeReducer;

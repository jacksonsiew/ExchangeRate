import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import dashboardReducer from "../reducers/DashboardReducer";
import userReducer from "../reducers/UserReducer";
import exchangeReducer from "../reducers/ExchangeReducer";

const rootReducer = combineReducers({
    dashboardReducer,
    userReducer,
    exchangeReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

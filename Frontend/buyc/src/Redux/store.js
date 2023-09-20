import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import thunk from "redux-thunk";

import {authReducer} from "../Redux/AuthRedux/reducer"
import {inventoryReducer} from "../Redux/CarsDealerRedux/reducer"
import {oemSpecsReducer} from "../Redux/OEmRedux/reducer"
const rootReducer = combineReducers({
    authReducer,
    inventoryReducer,
    oemSpecsReducer
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

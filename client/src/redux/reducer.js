import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { reducer as notifications } from "react-notification-system-redux";

import registerReducer from "../pages/auth/auth.Reducer";

const rootReducer = (history) =>
    combineReducers({
        router: connectRouter(history),
        notifications,
        registerState: registerReducer,
    });

export default rootReducer;

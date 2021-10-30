import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { reducer as notifications } from "react-notification-system-redux";

import registerReducer from "../pages/register/registerReducer";

const rootReducer = (history) =>
    combineReducers({
        router: connectRouter(history),
        notifications,
        register: registerReducer,
    });

export default rootReducer;

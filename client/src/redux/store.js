import { createStore, applyMiddleware, compose } from "redux";
import Thunk from "redux-thunk";
import logger from "redux-logger";
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'

import rootReducer from './rootReducer'

export const history = createBrowserHistory()

const userInfoFromStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [logger, Thunk];

const store = createStore(rootReducer(history), initialState, compose(applyMiddleware(routerMiddleware(history),...middleware)));
export default store;

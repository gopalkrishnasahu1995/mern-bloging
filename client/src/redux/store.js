import { createStore, applyMiddleware, compose } from "redux";
import Thunk from "redux-thunk";
import logger from "redux-logger";
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'

import rootReducer from './reducer'

export const history = createBrowserHistory()

const userInfoFromStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [logger, Thunk];

const store = createStore(rootReducer(history), initialState, compose(applyMiddleware(routerMiddleware(history), ...middleware)));
if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducer', () => {
        const nextRootReducer = require('./reducer').default; // eslint-disable-line global-require
        store.replaceReducer(nextRootReducer(history));
    });
}
export default store;

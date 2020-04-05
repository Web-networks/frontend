/* eslint-disable no-shadow */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';


import { formReducer } from './formReducer';
import storeReducer from './storeReducer';
import { userReducer } from './userReducer';

// @ts-ignore
export const createRootReducer = history => combineReducers({
    form: formReducer,
    store: storeReducer,
    userInfo: userReducer,
    router: connectRouter(history),
});

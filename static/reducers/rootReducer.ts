/* eslint-disable no-shadow */
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import { formReducer } from 'reducers/formReducer';
import { userReducer } from 'reducers/userReducer';
import { projectsReducer } from 'reducers/projectsReducer';

// @ts-ignore
export const createRootReducer = history => combineReducers({
    form: formReducer,
    userInfo: userReducer,
    projects: projectsReducer,
    router: connectRouter(history),
});

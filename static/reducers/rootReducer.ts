import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import { formReducer } from 'reducers/formReducer';
import { userReducer } from 'reducers/userReducer';
import { projectsReducer } from 'reducers/projectsReducer';
import { currentProjectsReducer } from './currentProjectReducer';

// @ts-ignore
export const createRootReducer = history => combineReducers({
    form: formReducer,
    user: userReducer,
    projects: projectsReducer,
    currentProject: currentProjectsReducer,
    router: connectRouter(history),
});

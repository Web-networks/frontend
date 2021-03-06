import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import { formReducer } from 'reducers/formReducer';
import { userReducer } from 'reducers/userReducer';
import { projectsReducer } from 'reducers/projectsReducer';
import { currentProjectsReducer } from 'reducers/currentProjectReducer';
import { modelReducer } from 'reducers/modelReducer';
import { layersReducer } from 'reducers/layersReducer';
import { confirmDialogReducer } from 'reducers/confirmDialogReducer';
import { notificationsReducer } from 'reducers/notificationsReducer';
import { learningTaskReducer } from 'reducers/learningTaskReducer';

// @ts-ignore due to some problem with types of router
export const createRootReducer = history => combineReducers({
    form: formReducer,
    user: userReducer,
    projects: projectsReducer,
    currentProject: currentProjectsReducer,
    model: modelReducer,
    layers: layersReducer,
    learningTask: learningTaskReducer,
    notifications: notificationsReducer,
    confirmDialog: confirmDialogReducer,
    router: connectRouter(history),
});

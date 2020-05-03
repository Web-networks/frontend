import { handleActions } from 'redux-actions';

import { ProjectsStateT } from 'types/projectsTypes';
import { UPDATE_STATE_DATA } from 'actions/formActions';
import { PROJECTS_FETCH } from 'actions/projectsActions';
import { updateStateDataFieldReducer, getFetchReducers } from './utils';

const ProjectsInitialState: ProjectsStateT = {
    pending: false,
    data: {
        projects: [],
        availableProjects: [],
    },
    error: null,
};

export const projectsReducer = handleActions<ProjectsStateT, any>({
    [UPDATE_STATE_DATA]: updateStateDataFieldReducer('projects'),

    ...getFetchReducers(PROJECTS_FETCH),
}, ProjectsInitialState);

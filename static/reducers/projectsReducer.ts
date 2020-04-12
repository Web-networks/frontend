import { handleActions } from 'redux-actions';

import { ProjectsStateField } from 'types/projectsTypes';

const ProjectsInitialState: ProjectsStateField = {
    pending: false,
    data: [],
    error: null,
};

export const projectsReducer = handleActions({}, ProjectsInitialState);

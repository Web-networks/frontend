import { handleActions } from 'redux-actions';

import { ProjectsStateT } from 'types/projectsTypes';
import { UPDATE_STATE_DATA } from 'actions/formActions';
import { PROJECTS_FETCH } from 'actions/projectsActions';
import { FailureFetchActionT, SuccesFetchActionT } from 'actions/utils';
import { updateStateDataField } from './utils';

const ProjectsInitialState: ProjectsStateT = {
    pending: false,
    data: {
        projects: [],
        availableProjects: [],
    },
    error: null,
};

export const projectsReducer = handleActions<ProjectsStateT, any>({
    [UPDATE_STATE_DATA]: updateStateDataField('projects'),

    [PROJECTS_FETCH.REQUEST_START]: projects => ({
        ...projects,
        pending: true,
    }),

    [PROJECTS_FETCH.REQUEST_FAILURE]: (projects, action: FailureFetchActionT) => {
        const { message } = action.payload;
        return {
            ...projects,
            errror: message,
        };
    },

    [PROJECTS_FETCH.REQUEST_SUCCESS]: (projects, action: SuccesFetchActionT) => {
        const { body: data } = action.payload;
        return {
            ...projects,
            data,
        };
    },

    [PROJECTS_FETCH.REQUEST_END]: projects => ({
        ...projects,
        pending: true,
    }),
}, ProjectsInitialState);

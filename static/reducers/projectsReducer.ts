import { handleActions } from 'redux-actions';

import { ProjectsStateField } from 'types/projectsTypes';
import { FORM_REQUEST_END, FormRequestEndActionT } from 'actions/formActions';
import { PROJECTS_FETCH } from 'actions/projectsActions';
import { FailureFetchAction, SuccesFetchAction } from 'actions/utils';

const ProjectsInitialState: ProjectsStateField = {
    pending: false,
    data: {
        projects: [],
        availableProjects: [],
    },
    error: null,
};

export const projectsReducer = handleActions<ProjectsStateField>({
    // @ts-ignore
    [FORM_REQUEST_END]: (projects, action: FormRequestEndActionT) => {
        const { body, error, stateField } = action.payload;
        if (error || stateField !== 'projects') {
            return projects;
        }
        return {
            ...projects,
            pending: false,
            data: body,
        };
    },

    [PROJECTS_FETCH.REQUEST_START]: projects => ({
        ...projects,
        pending: true,
    }),

    [PROJECTS_FETCH.REQUEST_FAILURE]: (projects, action: FailureFetchAction) => {
        const { message } = action.payload;
        return {
            ...projects,
            errror: message,
        };
    },

    [PROJECTS_FETCH.REQUEST_SUCCESS]: (projects, action: SuccesFetchAction) => {
        const response = action.payload.body;
        return {
            ...projects,
            data: response,
        };
    },

    [PROJECTS_FETCH.REQUEST_END]: projects => ({
        ...projects,
        pending: true,
    }),
}, ProjectsInitialState);

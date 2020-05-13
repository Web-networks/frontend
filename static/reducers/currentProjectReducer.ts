import { handleActions } from 'redux-actions';
import { CurrentProjectStateT } from 'types/currentProjectTypes';
import { CURRENT_PROJECT_FETCH } from 'actions/currentProjectActions';
import { getFetchReducers } from './utils';

const currentProjectIntialState: CurrentProjectStateT = {
    pending: false,
    data: null,
    error: null,
};


export const currentProjectsReducer = handleActions<CurrentProjectStateT, any>({
    ...getFetchReducers(CURRENT_PROJECT_FETCH),
}, currentProjectIntialState);

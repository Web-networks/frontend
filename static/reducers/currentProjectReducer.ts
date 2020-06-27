import { handleActions } from 'redux-actions';
import { CurrentProjectStateT } from 'types/currentProjectTypes';
import { CURRENT_PROJECT_FETCH, CLEAN_PROJECT } from 'actions/currentProjectActions';
import { getFetchReducers, updateStateDataFieldReducer } from './utils';
import { UPDATE_STATE_DATA } from 'actions/formActions';

const currentProjectIntialState: CurrentProjectStateT = {
    pending: false,
    data: null,
    error: null,
};


export const currentProjectsReducer = handleActions<CurrentProjectStateT, any>({
    ...getFetchReducers(CURRENT_PROJECT_FETCH),
    [UPDATE_STATE_DATA]: updateStateDataFieldReducer('currentProject'),
    [CLEAN_PROJECT]: () => currentProjectIntialState,
}, currentProjectIntialState);

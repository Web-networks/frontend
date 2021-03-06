import { handleActions } from 'redux-actions';

import { ModelStateT } from 'types/modelTypes';
import { UPDATE_STATE_DATA } from 'actions/formActions';
import { MODEL_FETCH, MODEL_REMOVE, CLEAN_MODEL } from 'actions/modelActions';
import { updateStateDataFieldReducer, getFetchReducers } from './utils';

const ModelInitialState: ModelStateT = {
    pending: false,
    data: null,
    error: null,
};

export const modelReducer = handleActions<ModelStateT, any>({
    [UPDATE_STATE_DATA]: updateStateDataFieldReducer('model'),

    ...getFetchReducers(MODEL_FETCH),
    ...getFetchReducers(MODEL_REMOVE),

    [CLEAN_MODEL]: () => ModelInitialState,
}, ModelInitialState);

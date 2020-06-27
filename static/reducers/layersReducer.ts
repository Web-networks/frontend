import { handleActions } from 'redux-actions';

import { LayersStateT } from 'types/layersTypes';
import { UPDATE_STATE_DATA } from 'actions/formActions';
import { LAYERS_FETCH, LAYER_REMOVE, CLEAN_LAYERS } from 'actions/layersActions';
import { updateStateDataFieldReducer, getFetchReducers } from './utils';

const LayersInitialState: LayersStateT = {
    pending: false,
    data: null,
    error: null,
};

export const layersReducer = handleActions<LayersStateT, any>({
    [UPDATE_STATE_DATA]: updateStateDataFieldReducer('layers'),

    ...getFetchReducers(LAYERS_FETCH),
    ...getFetchReducers(LAYER_REMOVE),

    [CLEAN_LAYERS]: () => LayersInitialState,
}, LayersInitialState);

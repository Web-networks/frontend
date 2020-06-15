import { handleActions } from 'redux-actions';

import { LayersStateT } from 'types/layersTypes';
import { UPDATE_STATE_DATA } from 'actions/formActions';
import { LAYERS_FETCH } from 'actions/layersActions';
import { updateStateDataFieldReducer, getFetchReducers } from './utils';

const LayersInitialState: LayersStateT = {
    pending: false,
    data: null,
    error: null,
};

export const layersReducer = handleActions<LayersStateT, any>({
    [UPDATE_STATE_DATA]: updateStateDataFieldReducer('layers'),

    ...getFetchReducers(LAYERS_FETCH),
}, LayersInitialState);

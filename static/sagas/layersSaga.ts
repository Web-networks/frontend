import { takeEvery, call } from 'redux-saga/effects';
import { fetchSaga } from 'sagas/fetchSagas';
import {
    LAYERS_FETCH,
    LAYER_REMOVE,
    layersFetch,
    layerRemove,

    LayersFetchEmitRequestActionT,
    LayerRemoveEmitRequestActionT,
} from 'actions/layersActions';

export function* layersSaga() {
    yield takeEvery(LAYERS_FETCH.EMIT_REQUEST, layersFetchSaga);
    yield takeEvery(LAYER_REMOVE.EMIT_REQUEST, layerRemoveSaga);
}

function* layersFetchSaga(action: LayersFetchEmitRequestActionT) {
    const { model } = action.payload;
    const fetchUrl = '/restapi/layers/get';
    yield call(fetchSaga, layersFetch, fetchUrl, {
        queryParams: {
            model,
        },
    });
}

function* layerRemoveSaga(action: LayerRemoveEmitRequestActionT) {
    const { id } = action.payload;
    const fetchUrl = '/restapi/layers/remove';
    yield call(fetchSaga, layerRemove, fetchUrl, {
        queryParams: {
            id,
        },
        successNotification: {
            type: 'success',
            text: 'Layer was successfully deleted',
        },
    });
}

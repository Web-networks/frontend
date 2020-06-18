import { takeEvery, call } from 'redux-saga/effects';
import { fetchSaga } from 'sagas/fetchSagas';
import {
    LAYERS_FETCH,
    layersFetch,

    LayersFetchEmitRequestActionT,
} from 'actions/layersActions';

export function* layersSaga() {
    yield takeEvery(LAYERS_FETCH.EMIT_REQUEST, layersFetchSaga);
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

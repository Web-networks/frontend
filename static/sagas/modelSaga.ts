import axios from 'axios';
import { takeEvery, put } from 'redux-saga/effects';
import {
    MODEL_FETCH,
    ModelFetchEmitRequestActionT,
    modelFetch,
} from 'actions/modelActions';

export function* modelSaga() {
    yield takeEvery(MODEL_FETCH.EMIT_REQUEST, modelFetchSaga);
}

function* modelFetchSaga(action: ModelFetchEmitRequestActionT) {
    const { project } = action.payload;
    try {
        const { data } = yield axios.get('/restapi/model/get', {
            params: {
                project,
            },
        });
        yield put(modelFetch.requestSuccess(data));
    } catch (error) {
        console.error(error);
        const { response: { data } } = error;
        yield put(modelFetch.requestFailure(data.message));
    } finally {
        yield put(modelFetch.requestEnd());
    }
}

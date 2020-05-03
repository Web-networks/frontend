import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';
import {
    CURRENT_PROJECT_FETCH,
    CurrentProjectEmitRequestActionT,
    currentProjectFetch,
} from 'actions/currentProjectActions';

export function* currentProjectSaga() {
    yield takeEvery(CURRENT_PROJECT_FETCH.EMIT_REQUEST, currentProjectFetchSaga);
}

function* currentProjectFetchSaga(action: CurrentProjectEmitRequestActionT) {
    const { project, user } = action.payload;
    yield put(currentProjectFetch.requestStart());
    try {
        const response = yield axios.get('/restapi/projects/info', {
            params: {
                project,
                user,
            },
        });
        yield put(currentProjectFetch.requestSuccess(response.data));
    } catch (error) {
        yield put(currentProjectFetch.requestFailure(String(error)));
    }
    yield put(currentProjectFetch.requestEnd());
}

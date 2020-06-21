import { call, takeEvery } from 'redux-saga/effects';
import { PROJECTS_FETCH, projectsFetch } from 'actions/projectsActions';
import { fetchSaga } from 'sagas/fetchSagas';

export function* projectsSaga() {
    yield takeEvery(PROJECTS_FETCH.EMIT_REQUEST, projectsFetchSaga);
}

function* projectsFetchSaga() {
    const fetchUrl = '/restapi/projects/my';
    yield call(fetchSaga, projectsFetch, fetchUrl);
}

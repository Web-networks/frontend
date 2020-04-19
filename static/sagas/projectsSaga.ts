import { all, call, take, put } from 'redux-saga/effects';
import { PROJECTS_FETCH } from 'actions/projectsActions';
import { successFetchAction, failureFetchAction, requestEndAction } from 'actions/utils';

export function* projectsSaga() {
    yield all([
        call(projectsFetchSaga),
    ]);
}

function* projectsFetchSaga() {
    while (true) {
        yield take(PROJECTS_FETCH.EMIT_REQUEST);
        const response = yield fetch('/restapi/projects/my');
        if (response.ok) {
            const body = yield response.json();
            yield put(successFetchAction(PROJECTS_FETCH, body));
        } else {
            yield put(failureFetchAction(PROJECTS_FETCH, response.message));
        }
        yield put(requestEndAction(PROJECTS_FETCH));
    }
}

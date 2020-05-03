import { fork, take, put, takeEvery, race, select } from 'redux-saga/effects';
import { PROJECTS_FETCH, projectsFetch } from 'actions/projectsActions';
import { push } from 'connected-react-router';
import { FORM_SUBMIT, FormEmitRequestActionT } from 'actions/formActions';
import { usernameSelector } from 'selectors/userSelectors';
import { SuccesFetchActionT } from 'actions/utils';
import { makeProjectsUrl } from 'lib/url';

export function* projectsSaga() {
    yield fork(projectsFetchSaga);
    yield takeEvery(FORM_SUBMIT.EMIT_REQUEST, projectAddFormSubmitSaga);
}

function* projectAddFormSubmitSaga(action: FormEmitRequestActionT) {
    const { stateField } = action.payload;
    if (stateField === 'projects') {
        const [actionSuccess]: [SuccesFetchActionT] = yield race([
            take(FORM_SUBMIT.REQUEST_SUCCESS),
            take(FORM_SUBMIT.REQUEST_FAILURE),
        ]);
        if (actionSuccess) {
            const username = yield select(usernameSelector);
            const projectsUrl = makeProjectsUrl(username);
            yield put(push(projectsUrl));
        }
    }
}

function* projectsFetchSaga() {
    while (true) {
        yield take(PROJECTS_FETCH.EMIT_REQUEST);
        const response = yield fetch('/restapi/projects/my');
        if (response.ok) {
            const body = yield response.json();
            yield put(projectsFetch.requestSuccess(body));
        } else {
            yield put(projectsFetch.requestFailure(response.message));
        }
        yield put(projectsFetch.requestEnd());
    }
}
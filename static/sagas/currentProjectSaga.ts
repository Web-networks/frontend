import { takeEvery, put, race, take } from 'redux-saga/effects';
import axios from 'axios';
import {
    CURRENT_PROJECT_FETCH,
    CurrentProjectEmitRequestActionT,
    currentProjectFetch,
} from 'actions/currentProjectActions';
import { FORM_SUBMIT, FormEmitRequestActionT } from 'actions/formActions';
import { SuccesFetchActionT, FailureFetchActionT } from 'actions/utils';
import { makeProjectUrl } from 'lib/url';
import { push } from 'connected-react-router';

export function* currentProjectSaga() {
    yield takeEvery(CURRENT_PROJECT_FETCH.EMIT_REQUEST, currentProjectFetchSaga);
    yield takeEvery(FORM_SUBMIT.EMIT_REQUEST, projectEditFormSubmitSaga);
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

function* projectEditFormSubmitSaga(action: FormEmitRequestActionT) {
    const { stateField } = action.payload;
    if (stateField !== 'currentProject') {
        return;
    }
    const [success]: [SuccesFetchActionT?, FailureFetchActionT?] = yield race([
        take(FORM_SUBMIT.REQUEST_SUCCESS),
        take(FORM_SUBMIT.REQUEST_FAILURE),
    ]);
    if (success) {
        const { owner, name } = success.payload.body;
        const projectsUrl = makeProjectUrl(owner.username, name);
        yield put(push(projectsUrl));
    }
}

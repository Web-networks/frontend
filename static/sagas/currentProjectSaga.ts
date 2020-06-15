import { takeEvery, put, race, take, call } from 'redux-saga/effects';
import {
    CURRENT_PROJECT_FETCH,
    CurrentProjectEmitRequestActionT,
    currentProjectFetch,
} from 'actions/currentProjectActions';
import { FORM_SUBMIT, FormEmitRequestActionT } from 'actions/formActions';
import { fetchSaga } from 'sagas/fetchSagas';
import { SuccesFetchActionT, FailureFetchActionT } from 'actions/utils';
import { makeProjectUrl } from 'lib/url';
import { push } from 'connected-react-router';

export function* currentProjectSaga() {
    yield takeEvery(CURRENT_PROJECT_FETCH.EMIT_REQUEST, currentProjectFetchSaga);
    yield takeEvery(FORM_SUBMIT.EMIT_REQUEST, projectEditFormSubmitSaga);
}

function* currentProjectFetchSaga(action: CurrentProjectEmitRequestActionT) {
    const { project, user } = action.payload;
    const url = '/restapi/projects/info';
    yield call(fetchSaga, currentProjectFetch, url, {
        queryParams: {
            project,
            user,
        },
    });
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

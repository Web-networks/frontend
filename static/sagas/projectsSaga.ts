import { call, take, put, takeEvery, race, select } from 'redux-saga/effects';
import { PROJECTS_FETCH, projectsFetch } from 'actions/projectsActions';
import { push } from 'connected-react-router';
import { FORM_SUBMIT, FormEmitRequestActionT } from 'actions/formActions';
import { usernameSelector } from 'selectors/userSelectors';
import { SuccesFetchActionT } from 'actions/utils';
import { makeProjectsUrl } from 'lib/url';
import { fetchSaga } from 'sagas/fetchSagas';

export function* projectsSaga() {
    yield takeEvery(PROJECTS_FETCH.EMIT_REQUEST, projectsFetchSaga);
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
    const fetchUrl = '/restapi/projects/my';
    yield call(fetchSaga, projectsFetch, fetchUrl);
}

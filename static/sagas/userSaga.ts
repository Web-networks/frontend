import { put, delay, call, fork, take, takeEvery, race } from 'redux-saga/effects';
import { push, LOCATION_CHANGE, LocationChangeAction } from 'connected-react-router';
import { userInfoUpdate } from 'actions/userActions';
import { FORM_SUBMIT, FormEmitRequestActionT } from 'actions/formActions';
import { UserT } from 'types/userTypes';
import { SuccesFetchActionT, FailureFetchActionT } from 'actions/utils';
import { makeProjectsUrl } from 'lib/url';


export function* userSaga() {
    yield fork(fetchUserInfoSaga);
    yield fork(userSignOutSaga);
    yield takeEvery(FORM_SUBMIT.EMIT_REQUEST, userFormSubmitSaga);
}

function* userFormSubmitSaga(action: FormEmitRequestActionT) {
    const { stateField, url } = action.payload;
    if (stateField === 'user') {
        const [success]: [SuccesFetchActionT?, FailureFetchActionT?] = yield race([
            take(FORM_SUBMIT.REQUEST_SUCCESS),
            take(FORM_SUBMIT.REQUEST_FAILURE),
        ]);
        // TODO: сделать что-то нормальное с маршрутизацией
        if (success && url !== '/passport/editinfo') {
            const { username } = success.payload.body;
            const projectsUrl = makeProjectsUrl(username);
            yield put(push(projectsUrl));
        }
    }
}

function* fetchUserInfoSaga() {
    const delayTime = 3600000;
    while (true) {
        const userRespone = yield fetch('/passport/current');
        const body = yield userRespone.json() as UserT;
        if (userRespone.ok) {
            yield put(userInfoUpdate(body));
        }
        yield delay(delayTime);
    }
}

function* userSignOutSaga() {
    while (true) {
        const action: LocationChangeAction = yield take(LOCATION_CHANGE);
        const { location: { pathname } } = action.payload;
        if (pathname === '/signout') {
            yield call(fetch, '/passport/signout');
            yield put(userInfoUpdate(null));
            yield put(push('/'));
        }
    }
}

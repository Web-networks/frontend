import { put, delay, call, all, take } from 'redux-saga/effects';
import { push, LOCATION_CHANGE, LocationChangeAction } from 'connected-react-router';

import { userInfoUpdate } from 'actions/userActions';
import { FORM_REQUEST_END, FormRequestEndActionT } from 'actions/formDataActions';

import { UserI } from 'types/userTypes';

export function* userSaga() {
    yield all([
        call(fetchUserInfoSaga),
        call(userInfoUpdatingSaga),
        call(userSignOutSaga),
    ]);
}

function* userInfoUpdatingSaga() {
    while (true) {
        const action: FormRequestEndActionT = yield take(FORM_REQUEST_END);
        const { error, stateField } = action.payload;
        if (stateField === 'userInfo' && !error) {
            yield put(push('/'));
        }
    }
}

function* fetchUserInfoSaga() {
    const delayTime = 600000;
    while (true) {
        const userRespone = yield fetch('/passport/current');
        const body = yield userRespone.json() as UserI;
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



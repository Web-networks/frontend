import { take, put, select, call, all, cancel } from 'redux-saga/effects';
import { goBack } from 'connected-react-router';

import {
    FORM_SUBMIT,
    FORM_CANCEL,
    FORM_UNMOUNT,

    formValidate,
    formSubmit,
    formSubmitFail,
    updateStateData,

    FormEmitRequestActionT,
} from 'actions/formActions';
import { formDataSelect, isFormWithErrors } from 'selectors/formSelectors';
import { postSaga } from 'sagas/fetchSagas';

export function* formSaga() {
    const tasks = yield all([
        call(formSubmitSaga),
        call(formCancelSaga),
    ]);
    yield take(FORM_UNMOUNT);
    yield cancel(tasks);
}

function* formCancelSaga() {
    while (true) {
        yield take(FORM_CANCEL);
        yield put(goBack());
    }
}

function* formSubmitSaga() {
    while (true) {
        const action: FormEmitRequestActionT = yield take(FORM_SUBMIT.EMIT_REQUEST);
        const { url, stateField } = action.payload;
        if (!url) {
            continue;
        }
        yield put(formValidate());
        if (yield select(isFormWithErrors)) {
            yield put(formSubmitFail());
            continue;
        }
        const formData = yield select(formDataSelect);
        const response = yield call(postSaga, url, formData);
        const body = yield response.json();
        if (!response.ok) {
            const { message, error } = body;
            yield put(formSubmit.requestFailure(message || error));
        } else {
            yield put(formSubmit.requestSuccess(body));
            yield put(updateStateData(stateField, body));
        }
        yield put(formSubmit.requestEnd());
    }
}

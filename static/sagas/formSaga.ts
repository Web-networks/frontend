import { take, put, select, call, all } from 'redux-saga/effects';
import { goBack } from 'connected-react-router';

import {
    FORM_SUBMIT,
    FORM_CANCEL,

    formValidate,
    formRequestEnd,
    FormSubmitActionT,
    formSubmitFail,
} from 'actions/formActions';
import { formDataSelect, isFormWithErrors } from 'selectors/formSelectors';
import { postSaga } from 'sagas/fetchSagas';

export function* formSaga() {
    yield all([
        call(formSubmitSaga),
        call(formCancelSaga),
    ]);
}

function* formCancelSaga() {
    while (true) {
        yield take(FORM_CANCEL);
        yield put(goBack());
    }
}

function* formSubmitSaga() {
    while (true) {
        const action: FormSubmitActionT = yield take(FORM_SUBMIT);
        const { submitUrl, stateField } = action.payload;
        if (!submitUrl) {
            continue;
        }
        yield put(formValidate());
        if (yield select(isFormWithErrors)) {
            yield put(formSubmitFail());
            continue;
        }
        const formData = yield select(formDataSelect);
        const response = yield call(postSaga, submitUrl, formData);
        const body = yield response.json();
        if (!response.ok) {
            const { message } = body;
            yield put(formRequestEnd(stateField, {}, message));
        } else {
            yield put(formRequestEnd(stateField, body, null));
        }
    }
}

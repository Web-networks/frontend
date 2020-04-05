import { take, put, select, call } from 'redux-saga/effects';

import { FORM_SUBMIT, formValidate, formRequestEnd, FormSubmitActionT, formSubmitFail } from 'actions/formDataActions';
import { formDataSelect, isFormWithErrors } from 'selectors/formSelectors';
import { postSaga } from './fetchSagas';

export function* formSaga() {
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

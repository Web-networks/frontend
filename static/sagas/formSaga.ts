import { take, put, select, fork } from 'redux-saga/effects';

import { FORM_SUBMIT, formValidate } from 'actions/formDataActions';
import { formDataSelect, isFormWithErrors } from 'selectors/formSelectors';
import { postSaga } from './fetchSagas';

export function* formSaga() {
    while (true) {
        const action = yield take(FORM_SUBMIT);
        const { submitUrl } = action.payload;
        if (!submitUrl) {
            continue;
        }
        yield put(formValidate());
        if (yield select(isFormWithErrors)) {
            continue;
        }
        const formData = yield select(formDataSelect);
        yield fork(postSaga, submitUrl, formData);
    }
}

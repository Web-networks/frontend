import { take, put, select, call, takeEvery } from 'redux-saga/effects';
import { goBack, push } from 'connected-react-router';

import {
    FORM_SUBMIT,
    FORM_CANCEL,

    formValidate,
    formSubmit,
    formSubmitFail,
    updateStateData,

    FormEmitRequestActionT,
} from 'actions/formActions';
import { formDataSelect, isFormWithErrors, additionalDataSelect } from 'selectors/formSelectors';
import { postSaga } from 'sagas/fetchSagas';

export function* formSaga() {
    yield takeEvery(FORM_SUBMIT.EMIT_REQUEST, formSubmitSaga);
    yield takeEvery(FORM_CANCEL, formCancelSaga);
}

function* formCancelSaga() {
    yield take(FORM_CANCEL);
    yield put(goBack());
}

function* formSubmitSaga(action: FormEmitRequestActionT) {
    const { url, stateField, redirectSuccessUrl } = action.payload;
    if (!url) {
        return;
    }
    yield put(formValidate());
    if (yield select(isFormWithErrors)) {
        yield put(formSubmitFail());
        return;
    }
    const formData = yield select(formDataSelect);
    const additionalData = yield select(additionalDataSelect);
    const requestData = Object.assign({}, formData, additionalData);
    const response: Response = yield call(postSaga, url, requestData);
    if (!response.ok) {
        let error: string;
        if (response.status !== 400) {
            error = `${response.status}: ${response.statusText}`;
        } else {
            const body = yield response.json();
            const { message, error: bodyError } = body;
            error = message || bodyError;
        }
        yield put(formSubmit.requestFailure(error));
    } else {
        const body = yield response.json();
        yield put(formSubmit.requestSuccess(body));
        yield put(updateStateData(stateField, body));
    }
    yield put(formSubmit.requestEnd());
    if (response.ok && redirectSuccessUrl) {
        yield put(push(redirectSuccessUrl));
    }
}

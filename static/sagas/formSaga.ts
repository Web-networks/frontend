import { put, select, call, takeEvery } from 'redux-saga/effects';
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
import { fetchSaga } from 'sagas/fetchSagas';

export function* formSaga() {
    yield takeEvery(FORM_SUBMIT.EMIT_REQUEST, formSubmitSaga);
    yield takeEvery(FORM_CANCEL, formCancelSaga);
}

function* formCancelSaga() {
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
    const body = yield call(fetchSaga, formSubmit, url, { body: requestData });
    if (body) {
        yield put(updateStateData(stateField, body));
    }
    if (body && redirectSuccessUrl) {
        yield put(push(redirectSuccessUrl));
    }
}

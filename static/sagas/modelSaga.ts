import { find } from 'lodash';
import {
    takeEvery,
    put,
    race,
    take,
    select,
    call,
} from 'redux-saga/effects';
import {
    MODEL_FETCH,
    MODEL_REMOVE,
    ModelFetchEmitRequestActionT,
    modelFetch,
    modelRemove,
} from 'actions/modelActions';
import { confirmDialog, CONFIRM_DIALOG } from 'actions/confirmDialogActions';
import { modelDataSelector } from 'selectors/modelSelectors';
import { fetchSaga } from 'sagas/fetchSagas';


export function* modelSaga() {
    yield takeEvery(MODEL_FETCH.EMIT_REQUEST, modelFetchSaga);
    yield takeEvery(MODEL_REMOVE.EMIT_REQUEST, modelRemoveSaga);
}

function* modelFetchSaga(action: ModelFetchEmitRequestActionT) {
    const { project } = action.payload;
    const fetchUrl = '/restapi/model/get';
    yield call(fetchSaga, modelFetch, fetchUrl, {
        queryParams: {
            project,
        },
    });
}

function* modelRemoveSaga() {
    const message = 'Do you really want to remove your model?';
    yield put(confirmDialog.show({ message }));
    const actions = yield race([
        take(CONFIRM_DIALOG.REJECT),
        take(CONFIRM_DIALOG.APPROVE),
    ]);
    yield put(confirmDialog.close());
    if (find(actions, { type: CONFIRM_DIALOG.APPROVE })) {
        const { id: modelId } = yield select(modelDataSelector);
        const fetchUrl = '/restapi/model/remove';
        yield call(fetchSaga, modelRemove, fetchUrl, {
            queryParams: {
                modelId,
            },
        });
    }
}

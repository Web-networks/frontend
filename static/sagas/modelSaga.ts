import axios from 'axios';
import { find } from 'lodash';
import {
    takeEvery,
    put,
    race,
    take,
    select,
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


export function* modelSaga() {
    yield takeEvery(MODEL_FETCH.EMIT_REQUEST, modelFetchSaga);
    yield takeEvery(MODEL_REMOVE.EMIT_REQUEST, modelRemoveSaga);
}

function* modelFetchSaga(action: ModelFetchEmitRequestActionT) {
    const { project } = action.payload;
    try {
        yield put(modelFetch.requestStart());
        const { data } = yield axios.get('/restapi/model/get', {
            params: {
                project,
            },
        });
        yield put(modelFetch.requestSuccess(data));
    } catch (error) {
        console.error(error);
        const { response: { data } } = error;
        yield put(modelFetch.requestFailure(data.message));
    } finally {
        yield put(modelFetch.requestEnd());
    }
}

function* modelRemoveSaga() {
    const message = 'Do you really want to remove your model?';
    yield put(confirmDialog.show({ message }));
    const actions = yield race([
        take(CONFIRM_DIALOG.REJECT),
        take(CONFIRM_DIALOG.APPROVE),
    ]);
    if (find(actions, { type: CONFIRM_DIALOG.APPROVE })) {
        yield put(modelRemove.requestStart());
        yield put(confirmDialog.close());
        const { id } = yield select(modelDataSelector);
        try {
            yield axios.get('/restapi/model/remove', {
                params: {
                    modelId: id,
                },
            });
            yield put(modelRemove.requestSuccess(null));
        } catch (error) {
            yield put(modelRemove.requestFailure(error.toString()));
        } finally {
            yield put(modelRemove.requestEnd());
        }
    } else {
        yield put(confirmDialog.close());
    }
}

import { fork, select, delay, cancel, call, take, put } from 'redux-saga/effects';
import { modelTaskSelector } from 'selectors/modelSelectors';
import { fetchSaga } from 'sagas/fetchSagas';
import { learningTaskFetch } from 'actions/learningTaskActions';
import { updateStateData } from 'actions/formActions';

export function* learningTaskSaga() {
    yield fork(taskIdWatcher);
}

function* taskIdWatcher() {
    let currentTask = yield select(modelTaskSelector);
    let forkedSaga;
    if (currentTask) {
        forkedSaga = yield fork(updatingTaskStatusSaga, currentTask);
    }
    while (true) {
        yield take('*');
        const updatedTask = yield select(modelTaskSelector);
        if (updatedTask !== currentTask) {
            currentTask = updatedTask;
            if (currentTask) {
                if (forkedSaga) {
                    yield cancel(forkedSaga);
                }
                forkedSaga = yield fork(updatingTaskStatusSaga, currentTask);
            }
        }
    }
}

function* updatingTaskStatusSaga(taskId: string) {
    const fetchUrl = `/data-api/training-tasks/${taskId}`;
    const interval = 100000;
    yield put(updateStateData('learningTask', { id: taskId }));
    while (true) {
        yield call(fetchSaga, learningTaskFetch, fetchUrl);
        yield delay(interval);
    }
}

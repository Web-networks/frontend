import { fork, select, delay, cancel, call, take, put } from 'redux-saga/effects';
import { modelTaskSelector } from 'selectors/modelSelectors';
import { fetchSaga } from 'sagas/fetchSagas';
import { learningTaskFetch, cleanLearningTask } from 'actions/learningTaskActions';
import { updateStateData } from 'actions/formActions';
import { learningTaskSelector } from 'selectors/learningTaskSelector';
import { LearningTasksStatuses } from 'types/learningTaskTypes';

export function* learningTaskSaga() {
    yield fork(taskIdWatcher);
}

function* taskIdWatcher() {
    let currentTask = yield select(modelTaskSelector);
    let forkedSaga;
    if (currentTask) {
        forkedSaga = yield fork(updatingTaskStatusSaga, currentTask);
    } else {
        yield put(cleanLearningTask());
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
            } else {
                yield cancel(forkedSaga);
                yield put(cleanLearningTask());
            }
        }
    }
}

function* updatingTaskStatusSaga(taskId: string) {
    const fetchUrl = `/data-api/training-tasks/${taskId}`;
    const interval = 10000;
    yield put(updateStateData('learningTask', { id: taskId }));
    while (true) {
        yield call(fetchSaga, learningTaskFetch, fetchUrl);
        const task = yield select(learningTaskSelector);
        // After status become success or failed -> prevent status updating
        if ([LearningTasksStatuses.SUCCEEDED, LearningTasksStatuses.FAILED].includes(task?.status)) {
            return;
        }
        yield delay(interval);
    }
}

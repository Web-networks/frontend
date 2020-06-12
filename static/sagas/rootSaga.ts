import { fork } from 'redux-saga/effects';
import { formSaga } from 'sagas/formSaga';
import { userSaga } from 'sagas/userSaga';
import { projectsSaga } from 'sagas/projectsSaga';
import { currentProjectSaga } from 'sagas/currentProjectSaga';
import { modelSaga } from 'sagas/modelSaga';
import { layersSaga } from 'sagas/layersSaga';

export function* rootSaga() {
    yield fork(formSaga);
    yield fork(userSaga);
    yield fork(projectsSaga);
    yield fork(currentProjectSaga);
    yield fork(modelSaga);
    yield fork(layersSaga);
}

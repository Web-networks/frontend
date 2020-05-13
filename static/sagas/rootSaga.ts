import { all, call } from 'redux-saga/effects';
import { formSaga } from 'sagas/formSaga';
import { userSaga } from 'sagas/userSaga';
import { projectsSaga } from 'sagas/projectsSaga';
import { currentProjectSaga } from 'sagas/currentProjectSaga';

function* rootSaga() {
    yield all([
        call(formSaga),
        call(userSaga),
        call(projectsSaga),
        call(currentProjectSaga),
    ]);
}

export default rootSaga;

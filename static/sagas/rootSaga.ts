import { all, call } from 'redux-saga/effects';
import { formSaga } from 'sagas/formSaga';
import { userSaga } from 'sagas/userSaga';
import { projectsSaga } from 'sagas/projectsSaga';

function* rootSaga() {
    yield all([
        call(formSaga),
        call(userSaga),
        call(projectsSaga),
    ]);
}

export default rootSaga;

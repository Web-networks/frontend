import { all, fork } from 'redux-saga/effects';
import { formSaga } from './formSaga';
import { userSaga } from './userSaga';

function* rootSaga() {
    yield all([
        fork(formSaga),
        fork(userSaga),
    ]);
}

export default rootSaga;

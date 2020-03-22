import { all, fork } from 'redux-saga/effects';
import { formSaga } from './formSaga';

function* rootSaga() {
    yield all([fork(formSaga)]);
}

export default rootSaga;

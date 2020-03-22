import { applyMiddleware, createStore } from 'redux';
import { SagaMiddleware } from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from 'reducers/rootReducer';

function configureStore(saga: SagaMiddleware) {
    if (NODE_ENV === 'development') {
        return createStore(
            rootReducer,
            composeWithDevTools(applyMiddleware(saga)),
        );
    }
    return createStore(rootReducer, applyMiddleware(saga));
}

export default configureStore;

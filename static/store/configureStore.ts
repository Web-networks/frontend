import { applyMiddleware, createStore } from 'redux';
import { SagaMiddleware } from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';

import { createRootReducer } from 'reducers/rootReducer';

// eslint-disable-next-line no-shadow
export const history = createBrowserHistory();

function configureStore(saga: SagaMiddleware) {
    const rootReducer = createRootReducer(history);
    if (NODE_ENV === 'development') {
        return createStore(
            rootReducer,
            composeWithDevTools(applyMiddleware(routerMiddleware(history), saga)),
        );
    }
    return createStore(rootReducer, applyMiddleware(saga, routerMiddleware(history)));
}

export default configureStore;

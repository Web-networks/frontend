import React from 'react';
import ReactDOM from 'react-dom';
import configureStore, { history } from 'store/configureStore';
import createSagaMiddleware from 'redux-saga';

import { App } from 'app';
import rootSaga from 'sagas/rootSaga';


function render() {
    const sagaMiddleware = createSagaMiddleware();
    const store = configureStore(sagaMiddleware);
    sagaMiddleware.run(rootSaga);

    const rootSelector = 'root';
    const rootElement = document.createElement('div');
    rootElement.setAttribute('id', rootSelector);
    document.body.appendChild(rootElement);

    ReactDOM.render(
        <App
            history={history}
            store={store}
        />,
        document.getElementById(rootSelector),
    );
}

window.addEventListener('DOMContentLoaded', render);

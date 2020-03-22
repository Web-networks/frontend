import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';

import Layout from 'containers/Layout/Layout';
import configureStore from 'store/configureStore';
import rootSaga from 'sagas/rootSaga';

interface AppI {
    store: any;
}

function App(props: AppI) {
    return (
        <Provider store={props.store}>
            <Router>
                <Route path='/'>
                    <Layout>
                        <div>{'Вот так вот'}</div>
                    </Layout>
                </Route>
            </Router>
        </Provider>
    );
}

function render() {
    const sagaMiddleware = createSagaMiddleware();
    const store = configureStore(sagaMiddleware);
    sagaMiddleware.run(rootSaga);

    ReactDOM.render(<App store={store}/>, document.getElementById('root'));
}

window.addEventListener('DOMContentLoaded', render);

import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';

import Layout from 'containers/Layout/Layout';
import configureStore from 'store/configureStore';
import rootSaga from 'sagas/rootSaga';
import UserSignInForm from 'containers/UserSignInForm/UserSignInForm';
import UserSignUpForm from 'containers/UserSignUpForm/UserSignUpForm';

interface AppI {
    store: any;
}

function App(props: AppI) {
    return (
        <Provider store={props.store}>
            <Router>
                <Route path='/'>
                    <Layout>
                        <Route exact path='/sign'>
                            <UserSignInForm
                                submitUrl='/passport/signin'
                            />
                        </Route>
                        <Route exact path='/signup'>
                            <UserSignUpForm
                                submitUrl='/passport/signup'
                            />
                        </Route>
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

    const rootSelector = 'root';
    const rootElement = document.createElement('div');
    rootElement.setAttribute('id', rootSelector);
    document.body.appendChild(rootElement);

    ReactDOM.render(<App store={store}/>, document.getElementById(rootSelector));
}

window.addEventListener('DOMContentLoaded', render);

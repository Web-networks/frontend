/* eslint-disable no-shadow */
import ReactDOM from 'react-dom';
import React from 'react';
import { Route, Switch } from 'react-router';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { ConnectedRouter } from 'connected-react-router';
import 'bootstrap/dist/css/bootstrap.min.css';

import Layout from 'containers/Layout/Layout';
import configureStore, { history } from 'store/configureStore';
import rootSaga from 'sagas/rootSaga';
import UserSignInForm from 'containers/UserSignInForm/UserSignInForm';
import UserSignUpForm from 'containers/UserSignUpForm/UserSignUpForm';

interface AppI {
    store: any;
}

function App(props: AppI) {
    return (
        <Provider store={props.store}>
            <ConnectedRouter history={history}>
                <Layout>
                    <Switch>
                        <Route exact path='/sign'>
                            <UserSignInForm
                                submitUrl='/passport/signin'
                                stateField='userInfo'
                            />
                        </Route>
                        <Route exact path='/signup'>
                            <UserSignUpForm
                                submitUrl='/passport/signup'
                                stateField='userInfo'
                            />
                        </Route>
                    </Switch>
                </Layout>
            </ConnectedRouter>
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

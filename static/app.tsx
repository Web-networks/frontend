import React from 'react';
import { Route, Switch } from 'react-router';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import 'bootstrap/dist/css/bootstrap.min.css';

import Layout from 'containers/Layout/Layout';
import UserSignInForm from 'containers/UserSignInForm/UserSignInForm';
import UserSignUpForm from 'containers/UserSignUpForm/UserSignUpForm';

interface AppI {
    store: any;
    history: any;
}

export function App(props: AppI): React.ReactElement {
    return (
        <Provider store={props.store}>
            <ConnectedRouter history={props.history}>
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

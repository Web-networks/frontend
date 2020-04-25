import React from 'react';
import { Route, Switch } from 'react-router';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'components/Styles/RootStyles.css';

import { Layout } from 'containers/Layout/Layout';
import { UserSignInForm } from 'containers/User/UserSignInForm/UserSignInForm';
import { UserSignUpForm } from 'containers/User/UserSignUpForm/UserSignUpForm';
import { ProjectsPage } from 'containers/Projects/ProjectsPage/ProjectsPage';

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
                                stateField='user'
                            />
                        </Route>
                        <Route exact path='/signup'>
                            <UserSignUpForm
                                submitUrl='/passport/signup'
                                stateField='user'
                            />
                        </Route>
                        <Route path='/:user'>
                            <ProjectsPage/>
                        </Route>
                    </Switch>
                </Layout>
            </ConnectedRouter>
        </Provider>
    );
}

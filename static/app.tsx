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
import { Landing } from 'containers/Landing/Landing';
import { EntranceForm } from 'components/Form/EntranceForm/EntranceForm';

interface AppI {
    store: any;
    history: any;
}

export function App(props: AppI): React.ReactElement {
    return (
        <Provider store={props.store}>
            <ConnectedRouter history={props.history}>
                <Switch>
                    <Route exact path='/'>
                        <Landing/>
                    </Route>
                    <Route path='/entrance'>
                        <EntranceForm/>
                    </Route>
                    <Route path='/sign'>
                        <UserSignInForm
                            submitUrl='/passport/signin'
                            stateField='user'
                        />
                    </Route>
                    <Route path='/signup'>
                        <UserSignUpForm
                            submitUrl='/passport/signup'
                            stateField='user'
                        />
                    </Route>
                    <Layout>
                        <Route path='/:user'>
                            <ProjectsPage/>
                        </Route>
                    </Layout>
                </Switch>
            </ConnectedRouter>
        </Provider>
    );
}

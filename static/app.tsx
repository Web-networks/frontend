import React from 'react';
import { Route, Switch } from 'react-router';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'components/Styles/RootStyles.css';

import { Layout } from 'containers/PageLayout/Layout/Layout';
import { ProjectsPage } from 'containers/Projects/ProjectsPage/ProjectsPage';
import { Landing } from 'containers/Landing/Landing';
import { EntranceForm } from 'components/Form/EntranceForm/EntranceForm';
import { ProfilePage } from './containers/Profile/ProfilePage/ProfilePage';

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
                    <Layout>
                        <Switch>
                            <Route path='/:user/profile/'>
                                <ProfilePage/>
                            </Route>
                            <Route path='/:user'>
                                <ProjectsPage/>
                            </Route>
                        </Switch>
                    </Layout>
                </Switch>
            </ConnectedRouter>
        </Provider>
    );
}

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'components/Styles/RootStyles.css';

import { Layout } from 'containers/PageLayout/Layout/Layout';
import { ProjectsPage } from 'containers/Projects/ProjectsPage/ProjectsPage';
import { ProjectPage } from 'containers/ProjectArea/ProjectPage/ProjectPage';
import { Landing } from 'containers/Landing/Landing';
import { EntranceForm } from 'components/Form/EntranceForm/EntranceForm';
import { ProfilePage } from 'containers/Profile/ProfilePage/ProfilePage';
import { ConfirmDialog } from 'containers/PageLayout/ConfirmDialog/ConfirmDialog';

interface AppI {
    store: any;
    history: any;
}

export function App(props: AppI): React.ReactElement {
    return (
        <Provider store={props.store}>
            <ConnectedRouter history={props.history}>
                <Switch>
                    <Route exact path='/' component={Landing}/>
                    <Route path='/entrance' component={EntranceForm}/>
                    <Route path={['/:user/profile/', '/:user/projects', '/:user/available_projects']}>
                        <Layout>
                            <Switch>
                                <Route path='/:user/profile/' component={ProfilePage}/>
                                <Route component={ProjectsPage}/>
                            </Switch>
                        </Layout>
                    </Route>
                    <Route path='/entrance' component={EntranceForm}/>
                    <Route path='/:user/:project' component={ProjectPage}/>
                </Switch>
            </ConnectedRouter>
            <ConfirmDialog/>
        </Provider>
    );
}

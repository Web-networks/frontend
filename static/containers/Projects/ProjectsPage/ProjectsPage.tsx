import React from 'react';
import { Location } from 'history';
import { connect } from 'react-redux';
import { Nav } from 'react-bootstrap';
import { withRouter, Link, Switch, Route } from 'react-router-dom';
import { projectsFetch } from 'actions/projectsActions';
import { ProjectsList } from 'components/Projects/ProjectsList/ProjectsList';
import { EmptyProjectsPage } from 'components/Projects/EmptyProjectsPage/EmptyProjectsPage';
import { ProjectForm } from 'containers/Projects/ProjectForm/ProjectForm';
import { ApplicationStateT } from 'types';
import { ProjectT } from 'types/projectsTypes';

import css from './ProjectsPage.module.css';


interface ProjectsPageConnectProps {
    projects: ProjectT[];
    availableProjects: ProjectT[];
    pending: boolean;
    error: string | null;
    username?: string | null;
}

interface ProjectsPageDispatchProps {
    updateProjects: () => void;
}

interface ProjectsPageOwnProps {
}

interface RouterInjectecProps {
    location: Location;
}

type ProjectsPageProps = ProjectsPageConnectProps
& ProjectsPageDispatchProps
& ProjectsPageOwnProps
& RouterInjectecProps;

function ProjectsPageComponent(props: ProjectsPageProps) {
    const { projects, username, location, updateProjects, availableProjects } = props;
    React.useEffect(() => {
        updateProjects();
    }, []);
    if (!username) {
        return null;
    }
    const ownProjectsUrl = `/${username}/projects/`;
    const availableProjectsUrl = `/${username}/projects/available_projects/`;
    const createionProjectUrl = `/${username}/projects/create_project/`;

    return (
        <div className={css.root}>
            <Nav
                justify
                variant="tabs"
                className={css.navbar}
                activeKey={location.pathname}
            >
                <Nav.Item>
                    <Nav.Link eventKey={ownProjectsUrl} as={Link} to={ownProjectsUrl}>
                        {'My projects'}
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey={availableProjectsUrl} as={Link} to={availableProjectsUrl}>
                        {'Available projects'}
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey={createionProjectUrl} as={Link} to={createionProjectUrl}>
                        {'Create new project'}
                    </Nav.Link>
                </Nav.Item>
            </Nav>
            <Switch>
                <Route path={'/:user/projects/available_projects'}>
                    {availableProjects.length
                        ? <ProjectsList projects={availableProjects}/>
                        : <div>{'You have not available projects'}</div>
                    }
                </Route>
                <Route path={'/:user/projects/create_project'}>
                    <ProjectForm
                        submitUrl='/restapi/projects/add'
                        stateField='projects'
                    />
                </Route>
                <Route path={'/:user/projects'}>
                    {projects.length
                        ? <ProjectsList projects={projects}/>
                        : <EmptyProjectsPage creationUrl={createionProjectUrl} />
                    }
                </Route>
            </Switch>
        </div>
    );
}

export const ProjectsPage = withRouter(
    connect<ProjectsPageConnectProps, ProjectsPageDispatchProps, ProjectsPageOwnProps>(
        ({ projects, user }: ApplicationStateT) => ({
            projects: projects.data.projects,
            availableProjects: projects.data.availableProjects,
            pending: projects.pending,
            error: projects.error,
            username: user.data?.username,
        }),
        dispatch => ({
            updateProjects: () => dispatch(projectsFetch.emitRequest({})),
        }),
    )(ProjectsPageComponent),
);

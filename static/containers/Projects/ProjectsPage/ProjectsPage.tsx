import React from 'react';
import { connect } from 'react-redux';
import { Image } from 'react-bootstrap';
import { Link, Switch, Route, NavLink } from 'react-router-dom';
import { projectsFetch } from 'actions/projectsActions';
import { ProjectsList } from 'components/Projects/ProjectsList/ProjectsList';
import { EmptyProjectsPage } from 'components/Projects/EmptyProjectsPage/EmptyProjectsPage';
import { ProjectForm } from 'containers/Projects/ProjectForm/ProjectForm';
import { ApplicationStateT } from 'types';
import { ProjectT } from 'types/projectsTypes';
import { withPendingState } from 'hocs/withPendingState';

import PlusIcon from './icons/plus.png';
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

type ProjectsPageProps = ProjectsPageConnectProps
& ProjectsPageDispatchProps
& ProjectsPageOwnProps;

function ProjectsPageComponent(props: ProjectsPageProps) {
    const { projects, username, updateProjects, availableProjects } = props;
    React.useEffect(() => {
        updateProjects();
    }, []);
    if (!username) {
        return null;
    }
    const ownProjectsUrl = `/${username}/projects`;
    const availableProjectsUrl = `/${username}/projects/available_projects/`;
    const creationProjectUrl = `/${username}/projects/create_project/`;

    return (
        <div className={css.root}>
            <div className={css.header}>
                <h2>{'Projects'}</h2>
                <Link
                    to={creationProjectUrl}
                    className={css.createLink}
                >
                    <div>{'Create'}</div>
                    <Image src={PlusIcon} width={30} />
                </Link>
            </div>
            <div className={css.menu}>
                <NavLink
                    exact
                    to={ownProjectsUrl}
                    className={css.menuItem}
                    activeClassName={css.activeMenuItem}
                >{'Own projects'}</NavLink>
                <NavLink
                    exact
                    to={availableProjectsUrl}
                    className={css.menuItem}
                    activeClassName={css.activeMenuItem}
                >
                    {'Shared projects'}
                </NavLink>
                <div className={css.lastMenuItem}></div>
            </div>
            <Switch>
                <Route exact path={'/:user/projects/available_projects'}>
                    {availableProjects.length
                        ? <ProjectsList projects={availableProjects}/>
                        : <EmptyProjectsPage />
                    }
                </Route>
                <Route exact path={'/:user/projects/create_project'}>
                    <ProjectForm
                        submitUrl='/restapi/projects/add'
                        stateField='projects'
                        redirectSuccessUrl={ownProjectsUrl}
                    />
                </Route>
                <Route exact path={'/:user/projects'}>
                    {projects.length
                        ? <ProjectsList projects={projects}/>
                        : <EmptyProjectsPage />
                    }
                </Route>
            </Switch>
        </div>
    );
}

export const ProjectsPage = connect<ProjectsPageConnectProps, ProjectsPageDispatchProps, ProjectsPageOwnProps>(
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
    null,
    { pure: false },
)(withPendingState(ProjectsPageComponent, 'projects'));

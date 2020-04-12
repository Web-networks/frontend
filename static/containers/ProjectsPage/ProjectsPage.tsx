import React from 'react';
import { connect } from 'react-redux';

import { EmptyProjectsPage } from 'components/EmptyProjectsPage/EmptyProjectsPage';

import { ApplicationStateT } from 'types/ApplicationStateT';
import { Project } from 'types/projectsTypes';

import css from './ProjectsPage.module.css';

interface ProjectsPageConnectProps {
    projects: Project[];
    pending: boolean;
    error: string | null;
}

interface ProjectsPageDispatchProps {
}

interface ProjectsPageOwnProps {
}

type ProjectsPageProps = ProjectsPageConnectProps & ProjectsPageDispatchProps & ProjectsPageOwnProps;

function ProjectsPageComponent(props: ProjectsPageProps): React.ReactElement {
    const { projects } = props;

    return (
        <div className={css.root}>
            { projects.length ? null : <EmptyProjectsPage /> }
        </div>
    );
}

export const ProjectsPage = connect<ProjectsPageConnectProps, ProjectsPageDispatchProps, ProjectsPageOwnProps>(
    ({ projects }: ApplicationStateT) => ({
        projects: projects.data,
        pending: projects.pending,
        error: projects.error,
    }),
)(ProjectsPageComponent);

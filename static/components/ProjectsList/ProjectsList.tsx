import React from 'react';
import { Project } from 'types/projectsTypes';
import { ProjectsListItem } from 'components/ProjectsListItem/ProjectsListItem';

import css from './ProjectsList.module.css';


interface ProjectsListProps {
    projects: Project[];
}

export function ProjectsList(props: ProjectsListProps): React.ReactElement {
    const { projects } = props;
    return (
        <div className={css.root}>
            {projects.map(project =>
                <ProjectsListItem
                    key={project.name}
                    project={project}
                />)
            }
        </div>
    );
}

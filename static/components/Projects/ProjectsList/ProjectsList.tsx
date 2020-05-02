import React from 'react';
import { ProjectT } from 'types/projectsTypes';
import { ProjectsListItem } from 'components/Projects/ProjectsListItem/ProjectsListItem';

import css from './ProjectsList.module.css';


interface ProjectsListProps {
    projects: ProjectT[];
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

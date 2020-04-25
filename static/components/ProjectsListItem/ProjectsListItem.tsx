import React from 'react';
import { Project } from 'types/projectsTypes';
import { Card } from 'react-bootstrap';
import { UserSelectItem } from 'components/UserSelectItem/UserSelectItem';

import css from './ProjectsListItem.module.css';

interface ProjectsListItemProps {
    project: Project;
}

export function ProjectsListItem(props: ProjectsListItemProps): React.ReactElement {
    const { project } = props;
    const { owner } = project;
    return (
        <Card
            className={css.root}
            bg='info'
            text='light'
        >
            <Card.Header>{project.name}</Card.Header>
            <Card.Body>
                <Card.Text>{project.description}</Card.Text>
                <div className={css.owner}>
                    <div className={css.ownerTitle}>{'Owner'}</div>
                    <UserSelectItem {...owner}/>
                </div>
                {project.sharedWith.length
                    ? <div className={css.sharedWith}>
                        <div className={css.sharedWithTitle}>{'Shared with'}</div>
                        {project.sharedWith.map(user =>
                            <UserSelectItem key={user.username} {...user} />,
                        )}
                    </div>
                    : null
                }
            </Card.Body>
            <Card.Footer>
                {project.isPublic ? 'Public' : 'Private'}
            </Card.Footer>
        </Card>
    );
}

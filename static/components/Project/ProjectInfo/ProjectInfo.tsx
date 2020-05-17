import React from 'react';
import { Spinner } from 'react-bootstrap';

import css from './ProjectInfo.module.css';
import { CurrentProjectDataT } from '../../../types/currentProjectTypes';

interface ProjectPageProps {
    projectInfo: CurrentProjectDataT;
}

export function ProjectInfo(props: ProjectPageProps): React.ReactElement {
    if (props.projectInfo === null) {
        return (
            <div className={css.spinner}>
                <Spinner animation={'border'}/>
            </div>
        );
    }
    const { description, displayName, isPublic, sharedWith, owner } = props.projectInfo;
    return (
        <div className={css.root}>
            <div className={css.displayName}>
                <span className={css.displayNameTitle}>{'Display name:'}</span>
                <span className={css.displayNameValue}>{displayName}</span>
            </div>
            <div className={css.description}>
                <span className={css.descriptionTitle}>{'Description:'}</span>
                <span className={css.descriptionValue}>{description}</span>
            </div>
            {isPublic}
            {sharedWith.length}
            {owner.username}
        </div>
    );
}

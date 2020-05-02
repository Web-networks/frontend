import React from 'react';
import { Image } from 'react-bootstrap';

import css from './EmptyProjectsPage.module.css';

import NoProjectsImg from './icons/no_projects.png';


export function EmptyProjectsPage(): React.ReactElement {
    return (
        <div className={css.root}>
            <div className={css.description}>{'No projects'}</div>
            <Image src={NoProjectsImg} className={css.noProjectsImg} width={200}/>
        </div>
    );
}

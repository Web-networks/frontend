import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Image, Alert } from 'react-bootstrap';

import css from './EmptyProjectsPage.module.css';

import RocketImg from '@assets/rocket.png';

export function EmptyProjectsPage(): React.ReactElement {
    return (
        <div className={css.root}>
            <Alert variant='info' className={css.description}>{'You have not any projects now'}</Alert>
            <Image src={RocketImg} className={css.rocket}/>
            <Link to={'/create_project'}>
                <Button>{'Start new project'}</Button>
            </Link>
        </div>
    );
}

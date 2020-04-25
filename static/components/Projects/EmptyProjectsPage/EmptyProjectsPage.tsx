import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Image, Alert } from 'react-bootstrap';

import css from './EmptyProjectsPage.module.css';

import RocketImg from '@assets/rocket.png';

interface EmptyProjectsPageProps {
    creationUrl: string;
}

export function EmptyProjectsPage(props: EmptyProjectsPageProps): React.ReactElement {
    const { creationUrl } = props;
    return (
        <div className={css.root}>
            <Alert variant='info' className={css.description}>{'You have not any own projects'}</Alert>
            <Image src={RocketImg} className={css.rocket}/>
            <Link to={creationUrl}>
                <Button>{'Start new project'}</Button>
            </Link>
        </div>
    );
}

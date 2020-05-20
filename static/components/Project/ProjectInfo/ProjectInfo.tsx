import React from 'react';
import { Spinner, Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CurrentProjectDataT } from 'types/currentProjectTypes';
import { UserCard } from 'components/User/UserCard/UserCard';
import { UsersList } from 'components/User/UsersList/UsersList';
import classNames from 'classnames';

import PrivateIcon from './icons/private.svg';
import PublicIcon from './icons/public.svg';

import css from './ProjectInfo.module.css';

interface ProjectPageProps {
    projectInfo: CurrentProjectDataT;
    projectEditPageUrl: string;
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
    const privacyClass = isPublic ? css.public : css.private;

    return (
        <div className={css.root}>
            <div className={classNames(css.infoContainer, css.displayName)}>
                <span className={css.infoTitle}>{'Display name:'}</span>
                <span>{displayName}</span>
            </div>
            <div className={classNames(css.infoContainer, css.description)}>
                <span className={css.infoTitle}>{'Description:'}</span>
                <span>{description}</span>
            </div>
            <div className={classNames(css.infoContainer, css.privacy)}>
                <span className={css.infoTitle}>{'Privacy: '}</span>
                <span className={classNames(css.privacyValue, privacyClass)}>
                    {(isPublic ? 'Public' : 'Private') + ' project'}
                </span>
                <Image className={css.privacyIcon} src={isPublic ? PublicIcon : PrivateIcon} width={40} />
            </div>
            <div className={classNames(css.infoContainer, css.owner)}>
                <span className={css.infoTitle}>{'Owner:'}</span>
                <div className={css.ownerUserCard}>
                    <UserCard userInfo={owner} />
                </div>
            </div>
            <div className={classNames(css.infoContainer, css.sharedWith)}>
                <span>{`Shared with ${sharedWith.length} people`}</span>
                <div className={css.sharedWithList}>
                    <UsersList users={sharedWith} />
                </div>
            </div>
            <Button
                variant='primary'
                className={css.editButton}
                to={props.projectEditPageUrl}
                as={Link}
            >
                {'Edit'}
            </Button>
        </div>
    );
}

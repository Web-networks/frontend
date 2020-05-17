import React from 'react';
import { Spinner, Image } from 'react-bootstrap';

import css from './ProjectInfo.module.css';
import { CurrentProjectDataT } from 'types/currentProjectTypes';
import PrivateIcon from './icons/private.svg';
import PublicIcon from './icons/public.svg';
import classNames from 'classnames';
import { UserCard } from 'components/User/UserCard/UserCard';
import { UsersList } from 'components/User/UsersList/UsersList';

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
    const privacyClass = isPublic ? css.public : css.private;

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
            <div className={css.privacy}>
                <span className={css.privacyTitle}>{'Privacy: '}</span>
                <span className={classNames(css.privacyValue, privacyClass)}>
                    {(isPublic ? 'Public' : 'Private') + ' project'}
                </span>
                <Image className={css.privacyIcon} src={isPublic ? PublicIcon : PrivateIcon} width={40} />
            </div>
            <div className={css.owner}>
                <span className={css.ownerTitle}>{'Owner:'}</span>
                <div className={css.ownerUserCard}>
                    <UserCard userInfo={owner} />
                </div>
            </div>
            <div className={css.sharedWith}>
                <span className={css.sharedWithTitle}>{`Shared with ${sharedWith.length} people`}</span>
                <div className={css.sharedWithList}>
                    <UsersList users={sharedWith} />
                </div>
            </div>
        </div>
    );
}

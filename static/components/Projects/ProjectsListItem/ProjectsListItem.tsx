import React from 'react';
import { ProjectT } from 'types/projectsTypes';
import { Image } from 'react-bootstrap';
import classnames from 'classnames';
import DefaultUserImg from '@assets/user.webp';

import PackImg from './icons/pack.svg';
import css from './ProjectsListItem.module.css';
import { MinUserInfoT } from 'types/userTypes';
import { Link } from 'react-router-dom';

interface ProjectsListItemProps {
    project: ProjectT;
}

interface ResultT {
    withAvatars: MinUserInfoT[];
    restUsers: MinUserInfoT[];
}

export function ProjectsListItem(props: ProjectsListItemProps): React.ReactElement {
    const { project } = props;
    const { sharedWith } = project;
    const maxPreviewUsersNumber = 5;
    const { withAvatars, restUsers } = sharedWith.reduce((result: ResultT, user: MinUserInfoT) => {
        if (!result.withAvatars.length || user.avatar && result.withAvatars.length < maxPreviewUsersNumber) {
            result.withAvatars.push(user);
        } else {
            result.restUsers.push(user);
        }
        return result;
    }, { withAvatars: [], restUsers: [] });
    const { owner } = project;
    const projectUrl = `/${owner.username}/${project.name}/`;
    return (
        <Link className={css.root} to={projectUrl}>
            <Image src={PackImg} width={50} />
            <div className={css.projectName}>{project.displayName}</div>
            <div className={css.description}>{project.description}</div>
            <div className={css.users}>
                {withAvatars.map(({ avatar }, index) =>
                    <Image
                        key={index}
                        src={avatar || DefaultUserImg}
                        width={40}
                        height={40}
                        roundedCircle
                        className={css.userImg}
                    />,
                )}
                <div className={css.restUsers}>{restUsers.length}{'+'}</div>
            </div>
            <div className={css.owner}>
                <Image src={owner.avatar || DefaultUserImg} width={60} height={60} roundedCircle/>
            </div>
            <div className={classnames(css.status, {
                [css.publicStatus]: project.isPublic,
            })}>{project.isPublic ? 'Public' : 'Private'}</div>
        </Link>
    );
}

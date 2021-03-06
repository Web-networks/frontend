import React from 'react';
import { MinUserInfoT } from 'types/userTypes';

import UserCardImg from '@assets/user.webp';
import { Image } from 'react-bootstrap';

import css from './UserCard.module.css';

interface UserCardProps {
    userInfo: MinUserInfoT;
}

export function UserCard(props: UserCardProps): React.ReactElement {
    const { username, firstName, lastName, avatar } = props.userInfo;
    const fullName = firstName && lastName && `${firstName} ${lastName}` || username;
    const imageSrc = avatar || UserCardImg;
    return (
        <div className={css.root}>
            <Image
                src={imageSrc}
                roundedCircle
                className={css.avatar}
            />
            <span className={css.name} title={fullName}>{fullName}</span>
        </div>
    );
}

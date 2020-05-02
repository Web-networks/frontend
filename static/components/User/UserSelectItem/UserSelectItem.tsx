import React from 'react';
import { Image } from 'react-bootstrap';
import { MinUserInfoT } from 'types/userTypes';
import DefaultUserImage from '@assets/user.webp';

import css from './UserSelectItem.module.css';


export function UserSelectItem(user: MinUserInfoT): React.ReactElement {
    const userImage = user.avatar || DefaultUserImage;
    return (
        <div className={css.root}>
            <Image src={userImage} width={25} height={25}/>
            <div className={css.username}>{user.username}</div>
        </div>
    );
}

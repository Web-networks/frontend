import React from 'react';
import { connect } from 'react-redux';
import { ApplicationStateT } from 'types';
import { Image } from 'react-bootstrap';
import { UserDataT } from 'types/userTypes';
import { UserPhotoForm } from 'containers/User/UserPhotoForm/UserPhotoForm';
import DefaultUserImage from '@assets/user.webp';

import css from './UserCard.module.css';

interface UserCardConnectProps {
    userInfo: UserDataT;
}

interface UserCardDispatchProps {
}

interface UserCardOwnProps {
}

type UserCardProps = UserCardConnectProps & UserCardDispatchProps & UserCardOwnProps;

function UserCardComponent(props: UserCardProps) {
    const { userInfo } = props;
    const [profileFormPhotoVisibility, setProfileFormVisibility] = React.useState(false);
    const showPhotoModalForm = React.useCallback(() => setProfileFormVisibility(true), [setProfileFormVisibility]);
    if (!userInfo) {
        return null;
    }
    const { avatar, username, firstName, lastName } = userInfo;
    const userImg = avatar || DefaultUserImage;
    const name = firstName && lastName && `${firstName} ${lastName}` || username;
    return (
        <div className={css.root}>
            <div className={css.imgParanja} onClick={showPhotoModalForm}>
                <Image
                    src={userImg}
                    width={150}
                    height={150}
                    roundedCircle
                />
            </div>
            <div className={css.name}>{name}</div>
            <UserPhotoForm
                visible={profileFormPhotoVisibility}
                setVisibility={setProfileFormVisibility}
            />
        </div>
    );
}

export const UserCard = connect<UserCardConnectProps, UserCardDispatchProps, UserCardOwnProps>(
    ({ user }: ApplicationStateT) => ({
        userInfo: user.data,
    }),
)(UserCardComponent);

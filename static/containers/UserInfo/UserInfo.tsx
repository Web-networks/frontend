import React from 'react';
import { connect } from 'react-redux';
import { Dropdown, Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { UserPhotoForm } from 'containers/UserPhotoForm/UserPhotoForm';
import { ApplicationStateT } from 'types/ApplicationStateT';
import UserCardImg from '@assets/user.webp';

import css from './UserInfo.module.css';

interface UserInfoProps {
    username?: string;
    avatar?: string | null;
}

function UserInfoComponent(props: UserInfoProps): React.ReactElement {
    const { username, avatar } = props;
    const imageSrc = avatar || UserCardImg;
    const [profileFormPhotoVisibility, setProfileFormVisibility] = React.useState(false);
    const showPhotoModalForm = React.useCallback(() => setProfileFormVisibility(true), [setProfileFormVisibility]);
    if (username) {
        return (
            <div className={css.root}>
                <Image
                    src={imageSrc}
                    roundedCircle
                    className={css.userSign}
                    onClick={showPhotoModalForm}
                />
                <Dropdown>
                    <Dropdown.Toggle variant="success" id='user-info'>{username}</Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item>
                            <Link to={`/${username}`}>{'Projects'}</Link>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <Link to={'/sign'}>{'Change user'}</Link>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <Link to={'/signout'}>{'Sign Out'}</Link>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <UserPhotoForm
                    visible={profileFormPhotoVisibility}
                    setVisibility={setProfileFormVisibility}
                />
            </div>
        );
    }

    return (
        <Link to='/sign'>
            <Button
                variant='primary'
            >{'Sign In'}</Button>
        </Link>
    );
}

export const UserInfo = connect(
    ({ userInfo }: ApplicationStateT): UserInfoProps => ({
        username: userInfo?.username,
        avatar: userInfo?.avatar,
    }),
)(UserInfoComponent);

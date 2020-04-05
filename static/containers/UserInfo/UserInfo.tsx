import React from 'react';
import { connect } from 'react-redux';
import { Dropdown, Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { ApplicationStateT } from 'types/ApplicationStateT';
import UserCardImg from '@assets/user.webp';

import css from './UserInfo.module.css';

interface UserInfoProps {
    username?: string;
}

function UserInfoComponent(props: UserInfoProps): React.ReactElement {
    const { username } = props;
    if (username) {
        return (
            <div className={css.root}>
                <Image
                    src={UserCardImg}
                    roundedCircle
                    className={css.userSign}
                />
                <Dropdown>
                    <Dropdown.Toggle variant="success" id='user-info'>{username}</Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item>
                            <Link to={'/sign'}>{'Change user'}</Link>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <Link to={'/signout'}>{'Sign Out'}</Link>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
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
    }),
)(UserInfoComponent);

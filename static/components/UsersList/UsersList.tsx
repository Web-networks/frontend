import React from 'react';
import { ListGroup, Image, Button } from 'react-bootstrap';
import { MinUserInfo } from 'types/userTypes';
import DefaultImage from '@assets/user.webp';

import css from './UsersList.module.css';

interface UsersListProps {
    users?: MinUserInfo[];
    onDelete: (username: string) => void;
}

export function UsersList(props: UsersListProps) {
    const { users, onDelete } = props;
    if (!users) {
        return null;
    }
    return (
        <div className={css.root}>
            <ListGroup>
                {users.map(user =>
                    <UserRow
                        key={user.username}
                        user={user}
                        onDelete={onDelete}
                    />,
                )}
            </ListGroup>
        </div>
    );
}

interface UserRowProps {
    user: MinUserInfo;
    onDelete: UsersListProps['onDelete'];
}

function UserRow(props: UserRowProps) {
    const { user: { username, avatar }, onDelete } = props;
    const deleteUser = React.useCallback(() => {
        onDelete(username);
    }, [onDelete, username]);
    const imageSrc = avatar || DefaultImage;
    return (
        <ListGroup.Item key={username} className={css.userItem}>
            <Image
                src={imageSrc}
                width={50}
                height={50}
            />
            <div className={css.username}>{username}</div>
            <Button
                variant='danger'
                className={css.removeButton}
                onClick={deleteUser}>{'Remove'}</Button>
        </ListGroup.Item>
    );
}

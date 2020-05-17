import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { MinUserInfoT } from 'types/userTypes';

import css from './UsersList.module.css';
import { UserCard } from 'components/User/UserCard/UserCard';

interface UsersListProps {
    users?: MinUserInfoT[];
}

export function UsersList(props: UsersListProps) {
    const { users } = props;
    if (!users) {
        return null;
    }
    return (
        <div className={css.root}>
            <ListGroup>
                {users.map(user =>
                    <UserCard
                        key={user.username}
                        userInfo={user}
                    />,
                )}
            </ListGroup>
        </div>
    );
}

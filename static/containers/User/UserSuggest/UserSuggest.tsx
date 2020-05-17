import React from 'react';
import axios from 'axios';
import Autosuggest from 'react-autosuggest';
import { connect } from 'react-redux';
import { memoize, uniqBy } from 'lodash';
import { UserSelectItem } from 'components/User/UserSelectItem/UserSelectItem';
import { TextInputForSuggest } from 'components/Controls/TextInputForSuggest/TextInputForSuggest';
import { UsersListWithDelete } from 'components/User/UsersListWithDelete/UsersListWithDelete';
import { ApplicationStateT } from 'types';
import { MinUserInfoT } from 'types/userTypes';

import css from './UserSuggest.module.css';

interface UserSuggestConnectProps {
    currentUser?: string;
}

interface UserSuggestDispatchProps {
}

interface UserSuggestOwnProps extends Omit<React.ComponentProps<typeof TextInputForSuggest>, 'onChange' | 'value'> {
    value: MinUserInfoT[];
    onChange: (value: MinUserInfoT[]) => void;
}

type UserSuggestProps = UserSuggestConnectProps & UserSuggestDispatchProps & UserSuggestOwnProps;

const fetchUsers = memoize(async (username?: string): Promise<MinUserInfoT[]> => {
    const limit = 10;
    try {
        const response = await axios.get('/restapi/users/find', {
            params: {
                username: username || null,
                limit,
            },
        });
        return response.data.users;
    } catch (error) {
        return [];
    }
});

function UserSuggestComponent(props: UserSuggestProps) {
    const {
        value: choosingUsers = [],
        onChange: onUsersChange,
        label,
        placeholder,
        currentUser,
    } = props;
    const [currentInputValue, setValue] = React.useState('');
    const [users, setUsers] = React.useState<MinUserInfoT[]>([]);
    React.useEffect(() => {
        async function addUsers() {
            const fetchingUsers = await fetchUsers();
            const nextUsers = fetchingUsers.filter(({ username }) => currentUser !== username);
            setUsers(nextUsers);
        }
        addUsers();
    }, [currentUser]);
    const onSuggestionsFetchRequested = React.useCallback(async ({ value: nextValue }: { value: string }) => {
        const fetchingUsers = await fetchUsers(nextValue);
        const excludeUsers = [currentUser, ...choosingUsers.map(({ username }) => username)].filter(Boolean);
        const nextUsers = fetchingUsers.filter(({ username }) => !excludeUsers.includes(username));
        setUsers(nextUsers);
    }, [setUsers, currentUser, choosingUsers]);
    const onSuggestionsClearRequested = React.useCallback(() => {
        setUsers([]);
    }, [setUsers]);
    const getSuggestionValue = React.useCallback(() => '', []);
    const onInputChange = React.useCallback((_, { newValue }) => {
        setValue(newValue);
    }, [setValue]);
    const onSuggestionSelected = React.useCallback((_, { suggestion: nextUser }: {suggestion: MinUserInfoT}) => {
        const nextUsers = choosingUsers && choosingUsers.concat(nextUser) || [nextUser];
        onUsersChange(uniqBy(nextUsers, 'username'));
    }, [onUsersChange, choosingUsers]);
    const onDeleteUser = React.useCallback((deleteUsername: string) => {
        const nextUsers = choosingUsers.filter(({ username }) => username !== deleteUsername);
        onUsersChange(nextUsers);
    }, [onUsersChange, choosingUsers]);
    const inputProps = {
        value: currentInputValue,
        onChange: onInputChange,
        label,
        placeholder,
    };
    return (
        <div className={css.root}>
            <Autosuggest
                suggestions={users}
                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                onSuggestionsClearRequested={onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                inputProps={inputProps}
                renderSuggestion={UserSelectItem}
                renderInputComponent={TextInputForSuggest}
                onSuggestionSelected={onSuggestionSelected}
            />
            <UsersListWithDelete
                users={choosingUsers}
                onDelete={onDeleteUser}
            />
        </div>
    );
}

export const UserSuggest = connect<UserSuggestConnectProps, UserSuggestDispatchProps, UserSuggestOwnProps>(
    ({ user }: ApplicationStateT) => ({
        currentUser: user.data?.username,
    }),
)(UserSuggestComponent);

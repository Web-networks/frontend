import { ApplicationStateT } from 'types';

export function usernameSelector(state: ApplicationStateT) {
    const { user } = state;
    if (!user.data) {
        throw new Error('You are not authorized');
    }
    const { username } = user.data;
    return username;
}

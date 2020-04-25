import { Action } from 'redux-actions';
import { UserT } from 'types/userTypes';

export const USER_INFO_UPDATE = 'USER_INFO_UPDATE';
export type UserInfoUpdateActionT = Action<UserT | null>;
export function userInfoUpdate(userInfo: UserT | null) {
    return { type: USER_INFO_UPDATE, payload: userInfo };
}

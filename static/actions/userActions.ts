import { Action } from 'redux-actions';
import { UserI } from 'types/userTypes';

export const USER_INFO_UPDATE = 'USER_INFO_UPDATE';
export type UserInfoUpdateActionT = Action<UserI | null>;
export function userInfoUpdate(userInfo: UserI | null) {
    return { type: USER_INFO_UPDATE, payload: userInfo };
}

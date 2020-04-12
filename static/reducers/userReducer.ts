import { handleActions } from 'redux-actions';
import { UserI } from 'types/userTypes';
import { USER_INFO_UPDATE, UserInfoUpdateActionT } from 'actions/userActions';
import { FORM_REQUEST_END, FormRequestEndActionT } from 'actions/formActions';

const USER_INITIAL_STATE: UserI | null = null;

export const userReducer = handleActions({
    [USER_INFO_UPDATE]: (_: UserI, action: UserInfoUpdateActionT): UserI | null => {
        const { payload: userInfo } = action;
        return userInfo;
    },

    // @ts-ignore
    [FORM_REQUEST_END]: (currentUser: UserI, action: FormRequestEndActionT): UserI | null => {
        const { body, stateField } = action.payload;
        if (stateField === 'userInfo') {
            return Object.assign({}, currentUser, body);
        }
        return currentUser;
    },
}, USER_INITIAL_STATE);

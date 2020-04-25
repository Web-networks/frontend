import { handleActions } from 'redux-actions';
import { UserStateT } from 'types/userTypes';
import { USER_INFO_UPDATE, UserInfoUpdateActionT } from 'actions/userActions';
import { UPDATE_STATE_DATA } from 'actions/formActions';
import { updateStateDataField } from './utils';

const USER_INITIAL_STATE: UserStateT = {
    pending: false,
    error: null,
    data: null,
};

export const userReducer = handleActions<UserStateT, any>({
    [USER_INFO_UPDATE]: (userState, action: UserInfoUpdateActionT) => {
        const { payload: userInfo } = action;
        return {
            ...userState,
            data: userInfo,
        };
    },

    [UPDATE_STATE_DATA]: updateStateDataField('user'),
}, USER_INITIAL_STATE);

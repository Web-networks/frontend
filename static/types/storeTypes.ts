import { UserI } from './userTypes';

export interface StoreI {
    userInfo: {
        value: UserI | null;
        pending: boolean;
    };
}

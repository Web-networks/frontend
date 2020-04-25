import { StateFieldT } from 'types/utilityTypes';

export interface UserStateT extends StateFieldT {
    data: UserT | null;
}

export type UserDataT = UserT | null;

export interface UserT {
    email: string;
    username: string;
    id: string;
    avatar: string | null;
}

export type MinUserInfoT = Omit<UserT, 'email'>;

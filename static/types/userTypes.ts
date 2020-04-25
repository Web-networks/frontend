export interface UserI {
    email: string;
    username: string;
    id: string;
    avatar: string | null;
}

export type MinUserInfo = Omit<UserI, 'email'>;

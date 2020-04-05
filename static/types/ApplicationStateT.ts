import { StoreI } from './storeTypes';
import { FormI } from './formDataTypes';
import { UserI } from './userTypes';

export interface ApplicationStateT {
    store: StoreI;
    form: FormI;
    userInfo: UserI | null;
}

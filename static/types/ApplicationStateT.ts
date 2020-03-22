import { StoreI } from './storeTypes';
import { FormDataI } from './formDataTypes';

export interface ApplicationStateT {
    store: StoreI;
    formData: FormDataI;
}

import { ApplicationStateT } from './ApplicationStateT';

export interface FormI {
    formData: FormDataI;
    pending: boolean;
    error: string | null;
}

export interface FormDataI {
    [key: string]: FormDataField;
}

export interface FormDataField {
    value: any;
    error: string | null;
    isRequired: boolean;
    isChanged: boolean;
}

export interface FormUIProps {
    stateField: keyof ApplicationStateT;
    submitUrl: string;
    submitForm?: () => void;
}

import { StateFieldT } from 'types/utilityTypes';

export interface FormStateT extends StateFieldT {
    data: FormDataT;
    additionalData: Record<string, any>;
    isSubmeted: boolean;
}

export interface FormDataT {
    [key: string]: FormDataFieldT;
}

export interface FormDataFieldT {
    value: any;
    error: string | null;
    isRequired: boolean;
    isChanged: boolean;
}

export interface FormUIPropsT {
    submitForm: () => void;
    cancelForm: () => void;
    formClassName?: string;
}

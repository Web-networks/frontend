export interface FormDataI {
    [key: string]: FormDataField;
}

export interface FormDataField {
    value: any;
    error: string | null;
    isRequired: boolean;
    isChanged: boolean;
}

export interface FormUI {
    submitUrl: string;
    submitForm?: () => void;
}

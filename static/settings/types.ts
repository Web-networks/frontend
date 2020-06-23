export type FieldType = 'select' | 'input' | 'boolean' | 'array';

export interface FormFieldSetting {
    fieldType: FieldType;
    required: boolean;
    label: string;
    clarification?: string;
    options?: string[];
    default?: any;

    // input type
    type?: string;

    // for number field
    step?: number;
    min?: number;
    max?: number;

    // for array of numbers field
    length?: number;
}

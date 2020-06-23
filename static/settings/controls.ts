import {
    FormSwitcher,
    FormTextInput,
    FormTypeahead,
    FormArrayTextInput,
} from 'containers/Form/SpaFormField/SpaFormField';
import { FormFieldSetting, FieldType } from 'settings/types';

interface BaseControlType extends Omit<FormFieldSetting, 'required' | 'default' | 'fieldType'> {
    fieldName: string;
    isRequired?: boolean;
    defaultValue: any;
    type?: string;
}

export const FieldComponents: Record<FieldType, React.ComponentType<BaseControlType>> = {
    input: FormTextInput,
    boolean: FormSwitcher,
    array: FormArrayTextInput,
    // @ts-ignore TODO: soleve problem
    select: FormTypeahead,
};

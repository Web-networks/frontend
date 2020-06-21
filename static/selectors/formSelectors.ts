import dot from 'dot-object';
import { ApplicationStateT } from 'types';

export function isFormWithErrors({ form: { data } }: ApplicationStateT) {
    const error = Object.keys(data).reduce((currentError, key) => currentError || data[key].error, null);
    return Boolean(error);
}

export function formDataSelect({ form: { data } }: ApplicationStateT): Record<string, any> {
    const changedData = Object.keys(data).reduce((currentData, key) => {
        const { value, isChanged } = data[key];
        if (isChanged) {
            return { ...currentData, [key]: value };
        }
        return currentData;
    }, {});
    return dot.object(changedData);
}

export function changedFieldsSelector({ form: { data } }: ApplicationStateT): string[] {
    return Object.keys(data).reduce((currentFields: string[], key) => {
        const { isChanged } = data[key];
        if (isChanged) {
            return currentFields.concat(key);
        }
        return currentFields;
    }, []);
}

export function additionalDataSelect({ form: { additionalData } }: ApplicationStateT) {
    return Object.assign({}, additionalData);
}

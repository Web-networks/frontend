import { ApplicationStateT } from 'types/ApplicationStateT';

export function isFormWithErrors({ form: { formData } }: ApplicationStateT) {
    const error = Object.keys(formData).reduce((currentError, key) => currentError || formData[key].error, null);
    return Boolean(error);
}

export function formDataSelect({ form: { formData } }: ApplicationStateT): {[key: string]: any} {
    const data: {[key: string]: any} = Object.keys(formData).reduce((currentData, key) => {
        const { value, isChanged } = formData[key];
        if (isChanged) {
            return { ...currentData, [key]: value };
        }
        return currentData;
    }, {});
    return data;
}

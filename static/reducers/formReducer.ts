import { handleActions } from 'redux-actions';

import { FormDataField, FormI } from 'types/formDataTypes';
import {
    ADD_FIELD_FORM,
    AddFieldFormActionT,
    CHANGE_FIELD_FORM,
    ChangeFieldFormActionT,
    FORM_MOUNT,
    FORM_UNMOUNT,
    FORM_VALIDATE,
    FORM_REQUEST_END,
    FormRequestEndActionT,
    FORM_SUBMIT,
    FORM_SUBMIT_FAIL,
} from 'actions/formDataActions';

export const FORM_INITIAL_STATE: FormI = {
    formData: {},
    pending: false,
    error: null,
};

function createFormField(form: FormI, fieldName: string, isRequired: boolean): FormI {
    const { formData } = form;
    return {
        ...form,
        formData: {
            ...formData,
            [fieldName]: {
                value: null,
                error: null,
                isRequired,
                isChanged: false,
            },
        },
    };
}

function updateFormFields(form: FormI, nextFormData: {[key: string]: Partial<FormDataField>}): FormI {
    const { formData } = form;
    const nextData = Object.assign({}, formData);
    for (const fieldName in nextFormData) {
        nextData[fieldName] = { ...formData[fieldName], ...nextFormData[fieldName] };
    }
    return { ...form, formData: nextData };
}

// @ts-ignore
export const formReducer = handleActions({
    [FORM_MOUNT]: (form: FormI): FormI => ({ ...FORM_INITIAL_STATE, ...form }),

    [ADD_FIELD_FORM]: (
        state: FormI,
        action: AddFieldFormActionT,
    ): FormI => {
        const { payload: { fieldName, isRequired } } = action;
        return createFormField(state, fieldName, isRequired);
    },

    [FORM_REQUEST_END]: (
        form: FormI,
        action: FormRequestEndActionT,
    ): FormI => {
        const { payload: { error } } = action;
        return { ...form, error, pending: false };
    },

    [CHANGE_FIELD_FORM]: (
        state: FormI,
        action: ChangeFieldFormActionT,
    ): FormI => {
        const { payload: { fieldName, value } } = action;
        return updateFormFields(state, { [fieldName]: { value, error: null, isChanged: true } });
    },

    [FORM_VALIDATE]: (
        form: FormI,
    ): FormI => {
        const { formData } = form;
        const errors = Object.keys(formData).reduce((currentErrors, fieldName) => {
            if (formData[fieldName].isRequired && !formData[fieldName].value) {
                return { ...currentErrors, [fieldName]: {
                    error: 'required field',
                } };
            }
            return currentErrors;
        }, {});
        return updateFormFields(form, errors);
    },

    [FORM_SUBMIT]: (
        form: FormI,
    ): FormI => ({ ...form, pending: true }),

    [FORM_SUBMIT_FAIL]: (form: FormI): FormI => ({ ...form, pending: false }),

    [FORM_UNMOUNT]: (): FormI => FORM_INITIAL_STATE,

}, FORM_INITIAL_STATE);

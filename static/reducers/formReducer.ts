import { handleActions } from 'redux-actions';

import { FormDataFieldT, FormStateT } from 'types/formTypes';
import {
    AddFieldFormActionT,
    AddFormDataActionT,
    FormMountActionT,
    ChangeFieldFormActionT,
    CHANGE_FIELD_FORM,
    ADD_FIELD_FORM,
    ADD_FORM_DATA,
    FORM_MOUNT,
    FORM_UNMOUNT,
    FORM_VALIDATE,
    FORM_SUBMIT,
    FORM_SUBMIT_FAIL,
} from 'actions/formActions';
import { FailureFetchActionT } from 'actions/utils';

export const FORM_INITIAL_STATE: FormStateT = {
    data: {},
    additionalData: {},
    pending: false,
    error: null,
    isSubmeted: false,
};

function createFormField(form: FormStateT, fieldName: string, isRequired: boolean): FormStateT {
    const { data } = form;
    return {
        ...form,
        data: {
            ...data,
            [fieldName]: {
                value: null,
                error: null,
                isRequired,
                isChanged: false,
            },
        },
    };
}

function updateFormFields(form: FormStateT, nextFormData: {[key: string]: Partial<FormDataFieldT>}): FormStateT {
    const { data } = form;
    const nextData = Object.assign({}, data);
    for (const fieldName in nextFormData) {
        nextData[fieldName] = { ...data[fieldName], ...nextFormData[fieldName] };
    }
    return { ...form, data: nextData };
}

export const formReducer = handleActions<FormStateT, any>({
    [FORM_MOUNT]: (form, action: FormMountActionT) => ({
        ...FORM_INITIAL_STATE,
        ...form,
        additionalData: Object.assign({}, action.payload.additionalData),
    }),

    [ADD_FIELD_FORM]: (form, action: AddFieldFormActionT) => {
        const { payload: { fieldName, isRequired } } = action;
        return createFormField(form, fieldName, isRequired);
    },

    [ADD_FORM_DATA]: (form, action: AddFormDataActionT) => ({
        ...form,
        additionalData: {
            ...form.additionalData,
            ...action.payload.additionalData,
        },
    }),

    [FORM_SUBMIT.REQUEST_FAILURE]: (form, action: FailureFetchActionT) => {
        const { payload: { message } } = action;
        return { ...form, error: message };
    },

    [FORM_SUBMIT.REQUEST_SUCCESS]: form => ({ ...form, isSubmeted: true }),

    [FORM_SUBMIT.REQUEST_END]: form => ({ ...form, pending: false }),

    [CHANGE_FIELD_FORM]: (form, action: ChangeFieldFormActionT) => {
        const { payload: { fieldName, value } } = action;
        return updateFormFields(form, { [fieldName]: { value, error: null, isChanged: true } });
    },

    [FORM_VALIDATE]: form => {
        const { data } = form;
        const errors = Object.keys(data).reduce((currentErrors, fieldName) => {
            if (data[fieldName].isRequired && !data[fieldName].value) {
                return { ...currentErrors, [fieldName]: {
                    error: 'required field',
                } };
            }
            return currentErrors;
        }, {});
        return updateFormFields(form, errors);
    },

    [FORM_SUBMIT.REQUEST_START]: form => ({ ...form, pending: true }),

    [FORM_SUBMIT_FAIL]: form => ({ ...form, pending: false }),

    [FORM_UNMOUNT]: () => FORM_INITIAL_STATE,

}, FORM_INITIAL_STATE);

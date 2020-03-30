import { handleActions } from 'redux-actions';
import { FormDataField, FormDataI } from '../types/formDataTypes';
import {
    ADD_FIELD_FORM,
    AddFieldFormActionT,
    CHANGE_FIELD_FORM,
    ChangeFieldFormActionT, FORM_MOUNT, FORM_UNMOUNT, FORM_VALIDATE,
} from 'actions/formDataActions';

export const FORM_DATA_INITIAL_STATE: FormDataI = {};

function createFormField(formData: FormDataI, fieldName: string, isRequired: boolean): FormDataI {
    return {
        ...formData, [fieldName]: {
            value: null,
            error: null,
            isRequired,
            isChanged: false,
        },
    };
}

function updateFormFields(formData: FormDataI, nextFormData: {[key: string]: Partial<FormDataField>}): FormDataI {
    const nextData = { ...formData };
    for (const fieldName in nextFormData) {
        // noinspection JSUnfilteredForInLoop
        nextData[fieldName] = { ...nextData[fieldName], ...nextFormData[fieldName] };
    }
    return nextData;
}

const formDataReducer = handleActions({
    [FORM_MOUNT]: (): FormDataI => FORM_DATA_INITIAL_STATE,

    [ADD_FIELD_FORM]: (
        state: FormDataI,
        action: AddFieldFormActionT,
    ): FormDataI => {
        const { payload: { fieldName, isRequired } } = action;
        return createFormField(state, fieldName, isRequired);
    },

    // @ts-ignore
    [CHANGE_FIELD_FORM]: (
        state: FormDataI,
        action: ChangeFieldFormActionT,
    ): FormDataI => {
        const { payload: { fieldName, value } } = action;
        return updateFormFields(state, {
            [fieldName]: { value, error: null, isChanged: true },
        });
    },

    [FORM_VALIDATE]: (
        formData: FormDataI,
    ): FormDataI => {
        const errors = Object.keys(formData).reduce((currentErrors, fieldName) => {
            if (formData[fieldName].isRequired && !formData[fieldName].value) {
                return { ...currentErrors, [fieldName]: {
                    error: 'required field',
                } };
            }
            return currentErrors;
        }, {});
        return updateFormFields(formData, errors);
    },

    [FORM_UNMOUNT]: (): FormDataI => FORM_DATA_INITIAL_STATE,

}, FORM_DATA_INITIAL_STATE);

export default formDataReducer;

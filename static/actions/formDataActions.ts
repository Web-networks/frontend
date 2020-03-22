import { Action } from 'redux-actions';

export const FORM_MOUNT = 'FORM_MOUNT';
export type FormMountActionT = Action<{}>;
export function formMount(): FormMountActionT {
    return { type: FORM_MOUNT, payload: {} };
}

export const ADD_FIELD_FORM = 'ADD_FIELD_FORM';
export type AddFieldFormActionT = Action<{fieldName: string; isRequired: boolean}>;
export function addFieldForm(fieldName: string, isRequired: boolean = false): AddFieldFormActionT {
    return { type: ADD_FIELD_FORM, payload: { fieldName, isRequired } };
}

export const CHANGE_FIELD_FORM = 'CHANGE_FIELD_FORM';
export type ChangeFieldFormActionT = Action<{fieldName: string; value: any}>;
export function changeFieldForm(fieldName: string, value: any): ChangeFieldFormActionT {
    return { type: CHANGE_FIELD_FORM, payload: { fieldName, value } };
}

export const FORM_VALIDATE = 'FORM_VALIDATE';
export type FormValidateActionT = Action<{}>;
export function formValidate(): FormValidateActionT {
    return { type: FORM_VALIDATE, payload: {} };
}

export const FORM_SUBMIT = 'FORM_SUBMIT';
export type FormSubmitActionT = Action<{submitUrl: string}>;
export function formSubmit(submitUrl: string): FormSubmitActionT {
    return { type: FORM_SUBMIT, payload: { submitUrl } };
}

export const FORM_UNMOUNT = 'FORM_UNMOUNT';
export type FormUnmountActionT = Action<{}>;
export function formUnmount(): FormUnmountActionT {
    return { type: FORM_UNMOUNT, payload: {} };
}

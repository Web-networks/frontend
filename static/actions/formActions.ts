import { Action } from 'redux-actions';
import { ApplicationStateT } from 'types/ApplicationStateT';

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
export type StateField = keyof ApplicationStateT;
export type FormSubmitActionT = Action<{submitUrl: string; stateField: StateField}>;
export function formSubmit(submitUrl: string, stateField: StateField): FormSubmitActionT {
    return { type: FORM_SUBMIT, payload: { submitUrl, stateField } };
}

export const FORM_SUBMIT_FAIL = 'FORM_SUBMIT_FAIL';
export type FormSubmitFailActionT = Action<{}>;
export function formSubmitFail(): FormSubmitFailActionT {
    return { type: FORM_SUBMIT_FAIL, payload: {} };
}

export const FORM_REQUEST_END = 'FORM_REQUEST_END';
export type FormRequestEndActionT = Action<{stateField: StateField; body: Record<string, any>; error: string | null}>;
export function formRequestEnd(
    stateField: StateField,
    body: Record<string, any>,
    error: string | null,
): FormRequestEndActionT {
    return { type: FORM_REQUEST_END, payload: { stateField, body, error } };
}

export const FORM_UNMOUNT = 'FORM_UNMOUNT';
export type FormUnmountActionT = Action<{}>;
export function formUnmount(): FormUnmountActionT {
    return { type: FORM_UNMOUNT, payload: {} };
}

export const FORM_CANCEL = 'FORM_CANCEL';
export type FormCancelActionT = Action<{}>;
export function formCancel(): FormCancelActionT {
    return { type: FORM_CANCEL, payload: {} };
}


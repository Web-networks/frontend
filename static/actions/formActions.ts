import { Action } from 'redux-actions';
import { ApplicationStateT, StateFieldKeyT } from 'types';
import { makeFetchableAction, MinEmitFetchActionPayloadT, EmitFetchActionT } from 'actions/utils';

export const FORM_MOUNT = 'FORM_MOUNT';
export type FormMountActionT = Action<{additionalData?: Record<string, any>}>;
export function formMount(additionalData?: Record<string, any>): FormMountActionT {
    return { type: FORM_MOUNT, payload: { additionalData } };
}

export const ADD_FORM_DATA = 'ADD_FORM_DATA';
export type AddFormDataActionT = Action<{additionalData: Record<string, any>}>;
export function addFormData(additionalData: Record<string, any>): AddFormDataActionT {
    return { type: ADD_FORM_DATA, payload: { additionalData } };
}

export const ADD_FIELD_FORM = 'ADD_FIELD_FORM';
export type AddFieldFormActionT = Action<{fieldName: string; isRequired: boolean; defaultValue?: any}>;
export function addFieldForm(fieldName: string, isRequired: boolean = false, defaultValue?: any): AddFieldFormActionT {
    return { type: ADD_FIELD_FORM, payload: { fieldName, isRequired, defaultValue } };
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

export interface FormPayloadT extends MinEmitFetchActionPayloadT {
    url: string;
    stateField: StateFieldKeyT;
    redirectSuccessUrl?: string;
}
export type FormEmitRequestActionT = EmitFetchActionT<FormPayloadT>;
export const [FORM_SUBMIT, formSubmit] = makeFetchableAction<FormPayloadT>('FORM_SUBMIT');

export const UPDATE_STATE_DATA = 'UPDATE_STATE_DATA';
export type UpdateStateDataActionT<T extends StateFieldKeyT> = Action<{
    data: Partial<ApplicationStateT[T]['data']>;
    stateField: T;
}>;
export function updateStateData<T extends StateFieldKeyT>(
    stateField: T,
    data: Partial<ApplicationStateT[T]['data']>,
): UpdateStateDataActionT<T> {
    return { type: UPDATE_STATE_DATA, payload: { stateField, data } };
}

export const FORM_SUBMIT_FAIL = 'FORM_SUBMIT_FAIL';
export type FormSubmitFailActionT = Action<{}>;
export function formSubmitFail(): FormSubmitFailActionT {
    return { type: FORM_SUBMIT_FAIL, payload: {} };
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


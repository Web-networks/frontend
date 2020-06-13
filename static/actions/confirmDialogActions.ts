import { createAction, Action } from 'redux-actions';
import { ConfirmDialogStateT } from 'types/confirmDialogTypes';

export enum CONFIRM_DIALOG {
    SHOW = 'SHOW',
    CLOSE = 'CLOSE',
    APPROVE = 'APPROVE',
    REJECT = 'REJECT'
}

type ShowPayloadT = Partial<Omit<ConfirmDialogStateT, 'opened'>>;
export type ConfirmDialogShowActionT = Action<ShowPayloadT>;

const show = createAction<ShowPayloadT>(CONFIRM_DIALOG.SHOW);
const close = createAction(CONFIRM_DIALOG.CLOSE);
const approve = createAction(CONFIRM_DIALOG.APPROVE);
const reject = createAction(CONFIRM_DIALOG.REJECT);

export const confirmDialog = {
    show,
    close,
    approve,
    reject,
};

import { handleActions } from 'redux-actions';

import { ConfirmDialogStateT } from 'types/confirmDialogTypes';
import { CONFIRM_DIALOG, ConfirmDialogShowActionT } from 'actions/confirmDialogActions';

const ConfirmDialogInitialStateT: ConfirmDialogStateT = {
    opened: false,
    message: 'Are you sure?',
    approveText: 'Yes',
    rejectText: 'No',
};

export const confirmDialogReducer = handleActions<ConfirmDialogStateT, any>({
    [CONFIRM_DIALOG.SHOW]: (state, action: ConfirmDialogShowActionT) => ({
        opened: true,
        message: action.payload.message || state.message,
        approveText: action.payload.approveText || state.approveText,
        rejectText: action.payload.rejectText || state.rejectText,
    }),

    [CONFIRM_DIALOG.CLOSE]: state => ({
        ...state,
        opened: false,
    }),
}, ConfirmDialogInitialStateT);

import { handleActions } from 'redux-actions';
import { NotificationsT } from 'types/notificationsTypes';
import { v4 as uuid } from 'uuid';
import {
    AddNotificationActionT,
    RemoveNotificationActionT,

    NOTIFICATION,
} from 'actions/notificationsActions';

const NotificationsInitialState: NotificationsT = {
    messages: [],
};

export const notificationsReducer = handleActions<NotificationsT, any>({
    [NOTIFICATION.ADD]: (state, action: AddNotificationActionT) => ({
        messages: state.messages.concat({
            id: uuid(),
            text: action.payload.text,
            type: action.payload.type,
        }),
    }),

    [NOTIFICATION.REMOVE]: (state, action: RemoveNotificationActionT) => ({
        messages: state.messages.filter(({ id }) => id !== action.payload.id),
    }),
}, NotificationsInitialState);

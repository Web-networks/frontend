import { createAction, Action } from 'redux-actions';
import { AlertProps } from 'react-bootstrap';

export enum NOTIFICATION {
    ADD = 'NOTIFICATION.ADD',
    REMOVE = 'NOTIFICATION.REMOVE',
}

export interface AddNotifictionPayloadT {
    type: AlertProps['variant'];
    text: string;
}
export type AddNotificationActionT = Action<AddNotifictionPayloadT>;
export const addNotification = createAction<AddNotifictionPayloadT>(NOTIFICATION.ADD);

interface RemoveNotificationPayloadT {
    id: string;
}
export type RemoveNotificationActionT = Action<RemoveNotificationPayloadT>;
export const removeNotification = createAction<RemoveNotificationPayloadT>(NOTIFICATION.REMOVE);

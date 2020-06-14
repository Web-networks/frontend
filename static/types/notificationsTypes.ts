import { AlertProps } from 'react-bootstrap';

export interface MessageT {
    id: string;
    type: AlertProps['variant'];
    text: string;
}

export interface NotificationsT {
    messages: MessageT[];
}

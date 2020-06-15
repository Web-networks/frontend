import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Alert, Fade } from 'react-bootstrap';
import { ApplicationStateT } from 'types';
import { MessageT } from 'types/notificationsTypes';
import { removeNotification } from 'actions/notificationsActions';

import css from './NotificationsCenter.module.css';

interface NotificationsCenterConnectProps {
    messages: MessageT[];
}

interface NotificationsCenterDispatchProps {
    removeNotification: (id: string) => void;
}

type NotificationsCenterProps = NotificationsCenterConnectProps & NotificationsCenterDispatchProps;

function NotificationsCenterComponent(props: NotificationsCenterProps): React.ReactElement {
    const { messages, removeNotification } = props;
    return ReactDOM.createPortal(
        <div className={css.root}>
            {messages.map((message: MessageT) =>
                <Notification
                    key={message.id}
                    message={message}
                    removeNotification={removeNotification}
                />,
            )}
        </div>,
        document.body,
    );
}

export const NotificationsCenter = connect<NotificationsCenterConnectProps, NotificationsCenterDispatchProps>(
    ({ notifications }: ApplicationStateT) => ({
        messages: notifications.messages,
    }),
    (dispatch: Dispatch) => ({
        removeNotification: id => dispatch(removeNotification({ id })),
    }),
)(NotificationsCenterComponent);

interface NotifictionProps {
    message: MessageT;
    removeNotification: (id: string) => void;
}

function Notification(props: NotifictionProps) {
    const { message, removeNotification } = props;
    const { id, text, type } = message;
    const onClose = React.useCallback(() => removeNotification(id), [id]);
    return (
        <Alert
            className={css.notification}
            onClose={onClose}
            variant={type}
            transition={Fade}
            dismissible
        >{text}</Alert>
    );
}

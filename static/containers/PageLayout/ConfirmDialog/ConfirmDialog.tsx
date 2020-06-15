import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Modal, Button } from 'react-bootstrap';
import { ApplicationStateT } from 'types';
import { ConfirmDialogStateT } from 'types/confirmDialogTypes';
import { confirmDialog } from 'actions/confirmDialogActions';

import css from './ConfirmDialog.module.css';

type ConfirmDialogConnectProps = ConfirmDialogStateT;

interface ConfirmDialogDispatchProps {
    onApprove: () => void;
    onReject: () => void;
}

interface ConfirmDialogOwnProps {
}

type ConfirmDialogProps = ConfirmDialogConnectProps & ConfirmDialogDispatchProps & ConfirmDialogOwnProps;

function ConfirmDialogComponent(props: ConfirmDialogProps): React.ReactElement {
    const {
        onApprove,
        onReject,
        opened,
        message,
        approveText,
        rejectText,
    } = props;
    return (
        <Modal
            show={opened}
            backdrop='static'
            keyboard={false}
            centered
        >
            <Modal.Body>
                <div className={css.message}>{message}</div>
                <div className={css.buttons}>
                    <Button variant='danger' size='lg' onClick={onReject}>{rejectText}</Button>
                    <Button variant='success' size='lg' onClick={onApprove}>{approveText}</Button>
                </div>
            </Modal.Body>
        </Modal>
    );
}

export const ConfirmDialog = connect<ConfirmDialogConnectProps, ConfirmDialogDispatchProps, ConfirmDialogOwnProps>(
    ({ confirmDialog }: ApplicationStateT) => ({
        ...confirmDialog,
    }),
    (dispatch: Dispatch) => ({
        onApprove: () => dispatch(confirmDialog.approve()),
        onReject: () => dispatch(confirmDialog.reject()),
    }),
)(ConfirmDialogComponent);

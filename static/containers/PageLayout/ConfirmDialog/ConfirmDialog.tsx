import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Modal, Button } from 'react-bootstrap';
import { ApplicationStateT } from 'types';
import { ConfirmDialogStateT } from 'types/confirmDialogTypes';
import { confirmDialog } from 'actions/confirmDialogActions';

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
            <Modal.Header>
                <Modal.Title>{message}</Modal.Title>
            </Modal.Header>
            <Modal.Footer>
                <Button variant='danger' onClick={onReject}>{rejectText}</Button>
                <Button variant='success' onClick={onApprove}>{approveText}</Button>
            </Modal.Footer>
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

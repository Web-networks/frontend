import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { LearnModelFormDeclaration } from 'containers/ProjectArea/LearnModelFormDeclaration/LearnModelFormDeclaration';
import { ApplicationStateT } from 'types';

import css from './LearnModelForm.module.css';

interface LearnModelFormConnectProps {
    modelId: string;
}

interface LearnModelFormDispatchProps {
}

interface LearnModelFormOwnProps {
    isOpened: boolean;
    closeForm: () => void;
}

type LearnModelFormProps = LearnModelFormConnectProps & LearnModelFormDispatchProps & LearnModelFormOwnProps;

function LearnModelFormComponent(props: LearnModelFormProps): React.ReactElement {
    const { isOpened, closeForm, modelId } = props;
    return (
        <Modal
            show={isOpened}
            onHide={closeForm}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>{'Learn model options'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <LearnModelFormDeclaration
                    submitUrl='/restapi/model/learn'
                    closeForm={closeForm}
                    stateField='model'
                    additionalData={{
                        modelId,
                    }}
                    formClassName={css.form}
                    callbackAfterSuccess={closeForm}
                />
            </Modal.Body>
        </Modal>
    );
}

export const LearnModelForm = connect<LearnModelFormConnectProps, LearnModelFormDispatchProps, LearnModelFormOwnProps>(
    ({ model }: ApplicationStateT) => ({
        modelId: model.data!.id,
    }),
)(LearnModelFormComponent);

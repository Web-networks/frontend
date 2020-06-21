import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';

import { ApplicationStateT } from 'types';
import { LayerT } from 'types/layersTypes';
import { LayerFormDeclaration } from 'containers/Layers/LayerFormDeclaration/LayerFormDeclaration';

import css from './LayerForm.module.css';

interface LayerFormConnectProps {
    modelId: string;
}

interface LayerFormDispatchProps {
}

interface LayerFormOwnProps {
    isOpened: boolean;
    layer?: LayerT;
    closeForm: () => void;
}

type LayerFormProps = LayerFormConnectProps & LayerFormDispatchProps & LayerFormOwnProps;

function LayerFormComponent(props: LayerFormProps): React.ReactElement {
    const { isOpened, closeForm, modelId, layer } = props;
    const isCreation = !layer;
    const formTitle = isCreation ? 'Layer creation form' : 'Layer editing form';
    const submitUrl = isCreation ? '/restapi/layers/add' : '/restapi/layers/edit';
    const additionalData = isCreation ? { model: modelId } : { id: layer!.id };
    return (
        <Modal
            show={isOpened}
            onHide={closeForm}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>{formTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <LayerFormDeclaration
                    closeForm={closeForm}
                    submitUrl={submitUrl}
                    stateField='layers'
                    formClassName={css.form}
                    additionalData={additionalData}
                    callbackAfterSuccess={closeForm}
                    layer={layer}
                />
            </Modal.Body>
        </Modal>
    );
}

export const LayerForm = connect<LayerFormConnectProps, LayerFormDispatchProps, LayerFormOwnProps>(
    ({ model }: ApplicationStateT) => ({
        modelId: model.data!.id,
    }),
)(LayerFormComponent);

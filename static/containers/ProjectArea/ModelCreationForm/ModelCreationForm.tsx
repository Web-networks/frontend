import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { createSpaForm } from 'containers/Form/SpaForm/SpaForm';
import { FormUIPropsT } from 'types/formTypes';
import { FormTypeahead } from 'containers/Form/SpaFormField/SpaFormField';
import ModelCreationSettings from 'settings/ModelCreationSettings.json';

import css from './ModelCreationForm.module.css';

interface ModelCreationFormConnectProps {
}

interface ModelCreationFormDispatchProps {
}

interface ModelCreationFormOwnProps extends FormUIPropsT {
    opened: boolean;
    closeForm: () => void;
}

type ModelCreationFormProps =
    ModelCreationFormConnectProps &
    ModelCreationFormDispatchProps &
    ModelCreationFormOwnProps;

function ModelCreationFormComponent(props: ModelCreationFormProps): React.ReactElement {
    const { opened, closeForm, submitForm } = props;
    return (
        <Modal
            show={opened}
            onHide={closeForm}
            centered
        >
            <Form>
                <Modal.Header closeButton>
                    <Modal.Title>{'Model creation'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={css.root}>
                        {Object.keys(ModelCreationSettings).map(settingName => {
                            const setting = ModelCreationSettings[settingName];
                            if (setting.fieldType === 'typeahead') {
                                return (
                                    <FormTypeahead
                                        key={settingName}
                                        fieldName={settingName}
                                        options={setting.options}
                                        label={setting.label}
                                    />
                                );
                            }
                            return null;
                        })}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={closeForm}>{'Close'}</Button>
                    <Button variant='primary' onClick={submitForm}>{'Submit form'}</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export const ModelCreationForm = createSpaForm(ModelCreationFormComponent);

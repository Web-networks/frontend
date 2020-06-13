import React from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Form } from 'react-bootstrap';
import { ApplicationStateT } from 'types';
import { createSpaForm } from 'containers/Form/SpaForm/SpaForm';
import { FormUIPropsT } from 'types/formTypes';
import { FormTypeahead } from 'containers/Form/SpaFormField/SpaFormField';
import { ModelCreationSettings } from 'settings/ModelCreationSettings';

import css from './ModelCreationForm.module.css';

interface ModelCreationFormStateProps {
    projectId?: string;
}

interface ModelCreationFormDispatchProps {
}

interface ModelCreationFormOwnProps {
    opened: boolean;
    closeForm: () => void;
}

type ModelCreationFormProps =
    ModelCreationFormStateProps &
    ModelCreationFormDispatchProps &
    ModelCreationFormOwnProps;

interface CreationFormProps extends FormUIPropsT {
    closeForm: () => void;
}

function CreationForm(props: CreationFormProps) {
    const { submitForm, closeForm } = props;
    return (
        <Form>
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
                                isRequired={setting.required}
                                clarification={setting.clarification}
                                maxSuggestHeight={200}
                            />
                        );
                    }
                    return null;
                })}
            </div>
            <div className={css.buttons}>
                <Button variant='secondary' onClick={closeForm}>{'Close'}</Button>
                <Button variant='success' onClick={submitForm}>{'Create'}</Button>
            </div>
        </Form>
    );
}

const SpaModelCreationForm = createSpaForm(CreationForm);

function ModelCreationFormComponent(props: ModelCreationFormProps) {
    const { opened, closeForm, projectId } = props;
    if (!projectId) {
        return null;
    }
    const additionalDataToForm = { project: projectId };
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
                    <SpaModelCreationForm
                        closeForm={closeForm}
                        submitUrl={'/restapi/model/create'}
                        stateField={'model'}
                        formClassName={css.form}
                        callbackAfterSuccess={closeForm}
                        additionalData={additionalDataToForm}
                    />
                </Modal.Body>
            </Form>
        </Modal>
    );
}

// eslint-disable-next-line max-len
export const ModelCreationForm = connect<ModelCreationFormStateProps, ModelCreationFormDispatchProps, ModelCreationFormDispatchProps>(
    ({ currentProject }: ApplicationStateT) => ({
        projectId: currentProject.data?.id,
    }),
)(ModelCreationFormComponent);

import React from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Form } from 'react-bootstrap';
import { ApplicationStateT } from 'types';
import { createSpaForm } from 'containers/Form/SpaForm/SpaForm';
import { FormUIPropsT } from 'types/formTypes';
import { ModelT } from 'types/modelTypes';
import { FormTypeahead } from 'containers/Form/SpaFormField/SpaFormField';
import { ModelCreationSettings } from 'settings/ModelCreationSettings';

import css from './ModelForm.module.css';

interface ModelFormStateProps {
    projectId?: string;
    defaultFields: ModelT | null;
}

interface ModelFormDispatchProps {
}

interface ModelFormOwnProps {
    opened: boolean;
    closeForm: () => void;
    isEditing?: boolean;
}

type ModelFormProps =
    ModelFormStateProps &
    ModelFormDispatchProps &
    ModelFormOwnProps;

interface FormProps extends FormUIPropsT {
    closeForm: () => void;
    defaultFields: Object;
}

function ModelFormDeclaration(props: FormProps) {
    const { submitForm, closeForm, defaultFields, isReadyToSubmit } = props;
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
                                defaultValue={defaultFields[settingName]}
                            />
                        );
                    }
                    return null;
                })}
            </div>
            <div className={css.buttons}>
                <Button variant='secondary' onClick={closeForm}>{'Close'}</Button>
                <Button variant='success' onClick={submitForm} disabled={!isReadyToSubmit}>{'Submit'}</Button>
            </div>
        </Form>
    );
}

const SpaModelForm = createSpaForm(ModelFormDeclaration);

function ModelFormComponent(props: ModelFormProps) {
    const { opened, closeForm, projectId, isEditing, defaultFields } = props;
    if (!projectId) {
        return null;
    }
    const submitUrl = isEditing ? '/restapi/model/edit' : '/restapi/model/create';
    const formTitle = isEditing ? 'Edit model' : 'Model creation';
    const additionalData = isEditing && defaultFields ? { modelId: defaultFields.id } : { project: projectId };
    const formDefaultFields = defaultFields || {};
    return (
        <Modal
            show={opened}
            onHide={closeForm}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>{formTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <SpaModelForm
                    closeForm={closeForm}
                    submitUrl={submitUrl}
                    stateField={'model'}
                    formClassName={css.form}
                    callbackAfterSuccess={closeForm}
                    additionalData={additionalData}
                    defaultFields={formDefaultFields}
                />
            </Modal.Body>
        </Modal>
    );
}

// eslint-disable-next-line max-len
export const ModelForm = connect<ModelFormStateProps, ModelFormDispatchProps, ModelFormDispatchProps>(
    ({ currentProject, model }: ApplicationStateT) => ({
        projectId: currentProject.data?.id,
        defaultFields: model.data,
    }),
)(ModelFormComponent);

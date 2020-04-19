import React from 'react';
import { Button } from 'react-bootstrap';
import { FormUIProps } from 'types/formTypes';
import { createSpaForm } from 'containers/SpaForm/SpaForm';
import { FormTextInput, FormUserSuggest, FormRadioButton } from 'containers/SpaFormField/SpaFormField';

import css from './ProjectForm.module.css';

interface ProjectFormProps extends FormUIProps { }

function ProjectFormComponent(props: ProjectFormProps): React.ReactElement {
    const { submitForm, cancelForm } = props;
    return (
        <div className={css.root}>
            <h2>{'Create new project'}</h2>
            <FormTextInput
                label='Name'
                fieldName='name'
                placeholder='my_project'
                isRequired={true}
            />
            <FormTextInput
                label='Description'
                fieldName='description'
                placeholder='Some information about your project'
                as='textarea'
            />
            <FormUserSuggest
                fieldName='sharedWith'
                label='Shared with'
                placeholder='user1'
            />
            <FormRadioButton
                label='Type of project'
                fieldName='isPublic'
                labelOn='Public'
                labelOff='Private'
            />
            <Button
                variant='secondary'
                onClick={cancelForm}
            >{'Cancel'}</Button>
            <Button
                className={css.submitButton}
                onClick={submitForm} variant='primary'>{'Create'}</Button>
        </div>
    );
}

export const ProjectForm = createSpaForm(ProjectFormComponent);

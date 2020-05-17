import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { FormUIPropsT } from 'types/formTypes';
import { createSpaForm } from 'containers/Form/SpaForm/SpaForm';
import {
    FormRadioButton,
    FormTextInput,
    FormUserSuggest,
} from 'containers/Form/SpaFormField/SpaFormField';

import css from './ProjectEditForm.module.css';
import { MinUserInfoT } from 'types/userTypes';

interface PropsT extends FormUIPropsT {
    displayName?: string | null;
    description?: string | null;
    isPublic?: boolean | null;
    sharedWith?: MinUserInfoT[] | null;
}

/*
            <FormTextInput
                label='Name'
                fieldName='name'
                placeholder='my_own_project'
                isRequired={true}
            />
*/

function ProjectEditFormComponent(props: PropsT) {
    const { submitForm, cancelForm, displayName, description, isPublic, sharedWith } = props;

    return (
        <div className={css.root}>
            <Form>
                <FormTextInput
                    label="Display name"
                    type="text"
                    placeholder="My own project"
                    fieldName="displayName"
                    defaultValue={displayName}
                    isRequired={true}
                />
                <FormTextInput
                    label='Description'
                    fieldName='description'
                    placeholder='Some information about your project'
                    defaultValue={description}
                    as='textarea'
                />
                <FormUserSuggest
                    fieldName='sharedWith'
                    label='Shared with'
                    placeholder='search user to add'
                    defaultValue={sharedWith}
                />
                <FormRadioButton
                    label='Type of project'
                    fieldName='isPublic'
                    labelOn='Public'
                    labelOff='Private'
                    defaultValue={isPublic}
                />
                <Button
                    onClick={submitForm}
                    variant={'success'}
                    className={css.saveButton}
                >
                    {'Save'}
                </Button>
                <Button
                    onClick={cancelForm}
                    variant={'danger'}
                    className={css.cancelButton}
                >
                    {'Cancel'}
                </Button>
            </Form>
        </div>
    );
}

export const ProjectEditForm = createSpaForm(ProjectEditFormComponent);

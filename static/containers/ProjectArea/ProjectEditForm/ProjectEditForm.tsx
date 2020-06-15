import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { FormUIPropsT } from 'types/formTypes';
import { MinUserInfoT } from 'types/userTypes';
import { ApplicationStateT } from 'types';
import { createSpaForm } from 'containers/Form/SpaForm/SpaForm';
import {
    FormRadioButton,
    FormTextInput,
    FormUserSuggest,
} from 'containers/Form/SpaFormField/SpaFormField';
import { changeFieldForm } from 'actions/formActions';
import { getName } from 'lib/utils';

import css from './ProjectEditForm.module.css';

interface PropsT extends FormUIPropsT {}

interface ProjectEditFormConnectProps {
    displayName: string | null;
    description?: string | null;
    isPublic?: boolean | null;
    sharedWith?: MinUserInfoT[] | null;
    name?: string | null;
}

interface ProjectEditFormDispatchPropsT {
    onChange: (fieldName: string, value: any) => void;
}

type ProjectEditFormProps = PropsT & ProjectEditFormDispatchPropsT & ProjectEditFormConnectProps;

function ProjectEditFormComponent(props: ProjectEditFormProps) {
    const {
        submitForm,
        cancelForm,
        displayName,
        description,
        isPublic,
        sharedWith,
        name,
        onChange,
        isReadyToSubmit,
    } = props;

    React.useEffect(() => {
        if (typeof displayName === 'string' && displayName) {
            const nextName = getName(displayName);
            if (nextName) {
                onChange('name', nextName);
            }
        }
    }, [displayName, onChange]);
    return (
        <div className={css.root}>
            <Form>
                <FormTextInput
                    label="Project name"
                    type="text"
                    placeholder="My own project"
                    fieldName="displayName"
                    defaultValue={displayName}
                    isRequired={true}
                />
                <FormTextInput
                    label='Name'
                    fieldName='name'
                    placeholder='my_own_project'
                    defaultValue={name}
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
                    disabled={!isReadyToSubmit}
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

export const ProjectEditForm = connect<ProjectEditFormConnectProps, ProjectEditFormDispatchPropsT>(
    ({ form, currentProject }: ApplicationStateT) => ({
        displayName: form.data.displayName?.value || currentProject.data?.displayName,
        name: currentProject.data?.name,
        description: currentProject.data?.description,
        isPublic: currentProject.data?.isPublic,
        sharedWith: currentProject.data?.sharedWith,
    }),
    dispatch => ({
        onChange: (fieldName, value) => dispatch(changeFieldForm(fieldName, value)),
    }),
)(createSpaForm(ProjectEditFormComponent));

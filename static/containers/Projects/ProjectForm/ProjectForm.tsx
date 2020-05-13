import React from 'react';
import { get } from 'lodash';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { FormUIPropsT } from 'types/formTypes';
import { createSpaForm } from 'containers/Form/SpaForm/SpaForm';
import { FormTextInput, FormUserSuggest, FormRadioButton } from 'containers/Form/SpaFormField/SpaFormField';
import { ApplicationStateT } from 'types';

import css from './ProjectForm.module.css';
import { changeFieldForm } from 'actions/formActions';

interface ProjectFormStatePropsT {
    displayName: string | null;
}

interface ProjectFormDispatchPropsT {
    onChange: (fieldName: string, value: any) => void;
}

interface ProjectOwnPropsT extends FormUIPropsT {}

type ProjectFormProps = ProjectOwnPropsT & ProjectFormDispatchPropsT & ProjectFormStatePropsT;

function ProjectFormComponent(props: ProjectFormProps): React.ReactElement {
    const { submitForm, displayName, onChange } = props;
    React.useEffect(() => {
        if (typeof displayName === 'string' && displayName) {
            const nextName = displayName
                .split(/[^\da-z]/ig)
                .filter(Boolean)
                .join('_')
                .toLowerCase();
            if (nextName) {
                onChange('name', nextName);
            }
        }
    }, [displayName, onChange]);
    return (
        <div className={css.root}>
            <h2>{'Create new project'}</h2>
            <FormTextInput
                label='Display name'
                fieldName='displayName'
                placeholder='My own project'
                isRequired={true}
            />
            <FormTextInput
                label='Name'
                fieldName='name'
                placeholder='my_own_project'
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
                className={css.submitButton}
                onClick={submitForm} variant='primary'>{'Create'}</Button>
        </div>
    );
}

export const ProjectForm = connect<ProjectFormStatePropsT, ProjectFormDispatchPropsT>(
    ({ form } : ApplicationStateT) => ({
        displayName: get(form ,'data.displayName.value', null),
    }),
    dispatch => ({
        onChange: (fieldName, value) => dispatch(changeFieldForm(fieldName, value)),
    }),
)(createSpaForm(ProjectFormComponent));

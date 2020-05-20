import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { get } from 'lodash';
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

interface PropsT extends FormUIPropsT {
    displayName?: string | null;
    description?: string | null;
    isPublic?: boolean | null;
    sharedWith?: MinUserInfoT[] | null;
    name?: string | null;
}

interface ProjectEditFormStatePropsT {
    _displayName: string | null;
}

interface ProjectEditFormDispatchPropsT {
    onChange: (fieldName: string, value: any) => void;
}

type ProjectEditFormProps = PropsT & ProjectEditFormDispatchPropsT & ProjectEditFormStatePropsT;

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
        _displayName,
    } = props;

    React.useEffect(() => {
        if (typeof _displayName === 'string' && _displayName) {
            const nextName = getName(_displayName);
            if (nextName) {
                onChange('name', nextName);
            }
        }
    }, [_displayName, onChange]);
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

export const ProjectEditForm = connect<ProjectEditFormStatePropsT, ProjectEditFormDispatchPropsT>(
    ({ form } : ApplicationStateT) => ({
        _displayName: get(form,'data.displayName.value', null),
    }),
    dispatch => ({
        onChange: (fieldName, value) => dispatch(changeFieldForm(fieldName, value)),
    }),
)(createSpaForm(ProjectEditFormComponent));

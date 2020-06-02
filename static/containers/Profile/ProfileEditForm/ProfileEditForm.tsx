import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { FormUIPropsT } from 'types/formTypes';
import { createSpaForm } from 'containers/Form/SpaForm/SpaForm';
import { FormTextInput } from 'containers/Form/SpaFormField/SpaFormField';

import css from './ProfileEditForm.module.css';

interface PropsT extends FormUIPropsT {
    firstName?: string | null;
    lastName?: string | null;
}

function ProfileEditFormComponent(props: PropsT) {
    const { submitForm, cancelForm, firstName, lastName } = props;

    return (
        <div className={css.root}>
            <Form>
                <FormTextInput
                    label="First name"
                    type="text"
                    placeholder="First name"
                    fieldName="firstName"
                    defaultValue={firstName}
                />
                <FormTextInput
                    label="Last name"
                    type="text"
                    placeholder="Last name"
                    fieldName="lastName"
                    defaultValue={lastName}
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

export const ProfileEditForm = createSpaForm(ProfileEditFormComponent);

import React, { useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { FormUIPropsT } from 'types/formTypes';
import { createSpaForm } from 'containers/Form/SpaForm/SpaForm';
import { FormTextInput } from 'containers/Form/SpaFormField/SpaFormField';

import css from './ProfileEditForm.module.css';
import { changeFieldForm } from '../../../actions/formActions';

interface PropsT extends FormUIPropsT {
    setIsEditFormOpened: (value: boolean) => void;
    firstName?: string | null;
    lastName?: string | null;
}

function ProfileEditFormComponent(props: PropsT) {
    const { submitForm, setIsEditFormOpened, firstName, lastName } = props;
    const onSave = React.useCallback(() => {
        setIsEditFormOpened(false);
        submitForm();
    }, [setIsEditFormOpened, submitForm]);
    const onCancel = React.useCallback(() => setIsEditFormOpened(false), [setIsEditFormOpened]);

    useEffect(() => {
        changeFieldForm('firstName', 'value');
    }, []);

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
                    onClick={onSave}
                    variant={'success'}
                    className={css.saveButton}
                >
                    {'Save'}
                </Button>
                <Button
                    onClick={onCancel}
                    variant={'danger'}
                    className={css.cancelButton}
                >
                    {'Cancel'}
                </Button>
            </Form>
        </div>
    );
}

export const ProfileEditForm = createSpaForm<PropsT>(ProfileEditFormComponent);

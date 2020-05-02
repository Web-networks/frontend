import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { FormUIPropsT } from 'types/formTypes';
import { createSpaForm } from 'containers/Form/SpaForm/SpaForm';
import { FormTextInput } from 'containers/Form/SpaFormField/SpaFormField';

import css from './UserSignInForm.module.css';

interface PropsT extends FormUIPropsT {}

function UserSignInFormComponent(props: PropsT) {
    const { submitForm } = props;

    return (
        <Form>
            <FormTextInput
                label='Email'
                type='email'
                placeholder='example@gmail.com'
                fieldName='email'
                isRequired={true}
            />
            <FormTextInput
                label='Password'
                type='password'
                fieldName='password'
                isRequired={true}
            />
            <Button onClick={submitForm} variant={'success'} className={css.loginButton}>{'Log In'}</Button>
        </Form>
    );
}


export const UserSignInForm = createSpaForm<PropsT>(UserSignInFormComponent);

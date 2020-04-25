import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { FormUIPropsT } from 'types/formTypes';
import { Link } from 'react-router-dom';
import { createSpaForm } from 'containers/Form/SpaForm/SpaForm';
import { FormTextInput } from 'containers/Form/SpaFormField/SpaFormField';

import css from './UserSignInForm.module.css';

interface PropsT extends FormUIPropsT {}

function UserSignInFormComponent(props: PropsT) {
    const { submitForm, cancelForm } = props;

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
            <Button
                onClick={submitForm}
            >{'Sign In'}</Button>
            <Button variant="secondary" onClick={cancelForm} className={css.exitButton}>{'Cancel'}</Button>
            <Link to='/signup' className={css.exitButton}>
                <Button variant="info">{'Sign Up'}</Button>
            </Link>
        </Form>
    );
}


export const UserSignInForm = createSpaForm<PropsT>(UserSignInFormComponent);

import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { FormUIProps } from 'types/formDataTypes';
import { Link } from 'react-router-dom';

import { createSpaForm } from 'containers/SpaForm/SpaForm';
import { FormTextInput } from 'containers/SpaFormField/SpaFormField';

import css from './UserSignInForm.module.css';

interface PropsT extends FormUIProps {}

function UserSignInForm(props: PropsT) {
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
            <Button
                onClick={submitForm}
            >{'Sign In'}</Button>
            <Link to='/' className={css.exitButton}>
                <Button variant="secondary">{'Cancel'}</Button>
            </Link>
            <Link to='/signup' className={css.exitButton}>
                <Button variant="info">{'Sign Up'}</Button>
            </Link>
        </Form>
    );
}


export default createSpaForm<PropsT>(UserSignInForm);

import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { FormUIPropsT } from 'types/formTypes';
import { createSpaForm } from 'containers/Form/SpaForm/SpaForm';
import { FormTextInput } from 'containers/Form/SpaFormField/SpaFormField';

import css from './UserSignUpForm.module.css';

interface PropsT extends FormUIPropsT {}

function UserSignUpFormComponent(props: PropsT) {
    const { submitForm, cancelForm } = props;
    return (
        <Form>
            <FormTextInput
                label='email'
                type='email'
                placeholder='example@gmail.com'
                fieldName='email'
                isRequired={true}
            />
            <FormTextInput
                label='username'
                placeholder='username'
                fieldName='username'
                isRequired={true}
            />
            <FormTextInput
                label='password'
                type='password'
                fieldName='password'
                isRequired={true}
            />
            <Button
                onClick={submitForm}
            >{'Sign Up'}</Button>
            <Button variant="secondary" onClick={cancelForm}>{'Cancel'}</Button>
            <Link to='/sign' className={css.exitButton}>
                <Button variant="info">{'Sign In'}</Button>
            </Link>
        </Form>
    );
}


export const UserSignUpForm = createSpaForm<PropsT>(UserSignUpFormComponent);

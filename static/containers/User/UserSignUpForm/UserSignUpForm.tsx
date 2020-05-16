import React from 'react';
import { Form, Button } from 'react-bootstrap';

import { FormUIPropsT } from 'types/formTypes';
import { createSpaForm } from 'containers/Form/SpaForm/SpaForm';
import { FormTextInput } from 'containers/Form/SpaFormField/SpaFormField';

import css from './UserSignUpForm.module.css';

interface OwnPropsT extends FormUIPropsT {}

type PropsT = OwnPropsT;

function UserSignUpFormComponent(props: PropsT) {
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
                label='Username'
                placeholder='username'
                fieldName='username'
                isRequired={true}
            />
            <FormTextInput
                label='Password'
                type='password'
                fieldName='password'
                isRequired={true}
            />
            <Button onClick={submitForm} variant={'success'} className={css.signupButton}>{'Sign Up'}</Button>
        </Form>
    );
}


export const UserSignUpForm = createSpaForm(UserSignUpFormComponent);

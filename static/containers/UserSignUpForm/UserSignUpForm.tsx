import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { FormUI } from 'types/formDataTypes';
import { createSpaForm } from 'containers/SpaForm/SpaForm';
import { FormTextInput } from 'containers/SpaFormField/SpaFormField';
import { FormUI as FormComponent } from 'components/FormUI/FormUI';

import css from './UserSignUpForm.module.css';

interface PropsT extends FormUI {}

function UserSignUpForm(props: PropsT) {
    const { submitForm } = props;
    return (
        <FormComponent>
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
                <Link to='/' className={css.exitButton}>
                    <Button variant="secondary">{'Cancel'}</Button>
                </Link>
            </Form>
        </FormComponent>
    );
}


export default createSpaForm<PropsT>(UserSignUpForm);

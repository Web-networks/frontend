import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { FormUI } from 'types/formDataTypes';
import { Link } from 'react-router-dom';

import { createSpaForm } from 'containers/SpaForm/SpaForm';
import { FormTextInput } from 'containers/SpaFormField/SpaFormField';

import css from './UserSignInForm.module.css';

interface PropsT extends FormUI {}

function UserSignInForm(props: PropsT) {
    const { submitForm } = props;

    return (
        <Form>
            <FormTextInput
                label='Почта'
                type='email'
                placeholder='example@gmail.com'
                fieldName='email'
                isRequired={true}
            />
            <FormTextInput
                label='Пароль'
                type='password'
                fieldName='password'
                isRequired={true}
            />
            <Button
                onClick={submitForm}
            >{'Далее'}</Button>
            <Link to='/' className={css.exitButton}>
                <Button>{'Выйти'}</Button>
            </Link>
        </Form>
    );
}


export default createSpaForm<PropsT>(UserSignInForm);

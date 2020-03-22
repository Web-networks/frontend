import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { FormUI } from 'types/formDataTypes';
import { createSpaForm } from 'containers/SpaForm/SpaForm';
import { FormTextInput } from 'containers/SpaFormField/SpaFormField';

import css from './UserSignUpForm.module.css';

interface PropsT extends FormUI {}

function UserSignUpForm(props: PropsT) {
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
                label='Имя'
                placeholder='Иван'
                fieldName='name'
                isRequired={true}
            />
            <FormTextInput
                label='Фамилия'
                placeholder='Иванов'
                fieldName='surname'
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


export default createSpaForm<PropsT>(UserSignUpForm);

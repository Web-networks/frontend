import React, { SyntheticEvent } from 'react';
import { Form } from 'react-bootstrap';

export interface TextInputPropsT {
    error?: string | null;
    label: string;
    value?: string;
    onChange?: (value?: any) => void;
    placeholder?: string;
    type?: 'email' | 'password';
    as?: 'textarea' | 'select';
}

export function TextInput(props: TextInputPropsT) {
    const {
        error,
        value,
        onChange,
        label,
        placeholder,
        type,
        as,
    } = props;
    const isInvalid = Boolean(error);
    const onChangeValue = React.useCallback(
        (inputEvent: SyntheticEvent<HTMLInputElement>) => onChange && onChange(inputEvent.currentTarget.value),
        [onChange]);
    // eslint-disable-next-line no-undefined
    const onInputChange = typeof onChange === 'function' ? onChangeValue : undefined;
    return (
        <Form.Group>
            <Form.Label>{label}</Form.Label>
            <Form.Control
                placeholder={placeholder}
                isInvalid={isInvalid}
                value={value}
                type={type}
                onChange={onInputChange}
                as={as}
            />
            <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
        </Form.Group>
    );
}

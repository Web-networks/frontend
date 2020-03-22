import React, { SyntheticEvent } from 'react';
import { Form } from 'react-bootstrap';

export interface TextInputPropsT {
    error?: string | null;
    label: string;
    value?: string;
    onChange?: (value?: any) => void;
    placeholder?: string;
    type?: 'email' | 'password';
    fieldName: string;
}

function TextInput(props: TextInputPropsT) {
    const { error, value, onChange, label, placeholder, type } = props;
    const isInvalid = Boolean(error);
    const onInputChange = React.useCallback(
        // @ts-ignore
        (inputEvent: SyntheticEvent) => onChange && onChange(inputEvent.currentTarget.value),
        [onChange]);

    return (
        <Form.Group>
            <Form.Label>{label}</Form.Label>
            <Form.Control
                placeholder={placeholder}
                isInvalid={isInvalid}
                value={value}
                type={type}
                onChange={onInputChange}
            />
            <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
        </Form.Group>
    );
}

export default TextInput;

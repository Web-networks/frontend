import React from 'react';
import { InputProps } from 'react-autosuggest';
import { Form } from 'react-bootstrap';

interface TextInputForSuggestProps<T> extends InputProps<T> {
    label?: string;
}

export function TextInputForSuggest<T>(props: TextInputForSuggestProps<T>): React.ReactElement {
    const {
        value,
        type,
        label,
        size: _,
        onChange,
        ...restProps
    } = props;
    const onInputChange: any = onChange;
    return (
        <Form.Group>
            {label && <Form.Label>{label}</Form.Label>}
            <Form.Control
                value={value}
                type={type}
                onChange={onInputChange}
                {...restProps}
            />
        </Form.Group>
    );
}

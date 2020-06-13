import React from 'react';
import { InputProps } from 'react-autosuggest';
import { Form } from 'react-bootstrap';

interface TextInputForSuggestProps<T> extends InputProps<T> {
    label?: string;
    placeholder?: string;
    error?: string | null;
    isRequired?: boolean;
    clarification?: string;
    inputRef?: (domNode: any) => void;
}

export function TextInputForSuggest<T>(props: TextInputForSuggestProps<T>): React.ReactElement {
    const {
        value,
        type,
        label,
        size: _,
        onChange,
        placeholder,
        error,
        isRequired,
        clarification,
        inputRef,
        ...restProps
    } = props;
    const isInvalid = Boolean(error);
    const onInputChange: any = onChange;
    // inputRef && inputRef('hello');
    return (
        <Form.Group>
            {label && <Form.Label>{label}</Form.Label>}
            <div ref={inputRef}>
                <Form.Control
                    value={value}
                    type={type}
                    isInvalid={isInvalid}
                    onChange={onInputChange}
                    placeholder={placeholder}
                    required={isRequired}
                    {...restProps}
                />
            </div>
            <Form.Text className={'text-muted'}>{clarification}</Form.Text>
            <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
        </Form.Group>
    );
}

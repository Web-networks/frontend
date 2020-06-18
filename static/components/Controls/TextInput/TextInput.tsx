import React, { SyntheticEvent } from 'react';
import { Form } from 'react-bootstrap';

type FormControlProps = React.ComponentProps<typeof Form.Control>;
export interface TextInputPropsT extends FormControlProps {
    error?: string | null;
    label: string;
    onChange?: (value?: any) => void;
    placeholder?: string;
    as?: 'textarea' | 'select';
    clarification?: string;
}

export function TextInput(props: TextInputPropsT) {
    const {
        error,
        onChange,
        label,
        placeholder,
        as,
        clarification,
        ...restProps
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
                onChange={onInputChange}
                as={as}
                {...restProps}
            />
            <Form.Text className={'text-muted'}>{clarification}</Form.Text>
            <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
        </Form.Group>
    );
}

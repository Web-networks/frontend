import React, { SyntheticEvent } from 'react';
import { Form } from 'react-bootstrap';

import css from './ArrayTextInput.module.css';

type FormControlProps = React.ComponentProps<typeof Form.Control>;

interface ArrayTextInputProps extends Omit<FormControlProps, 'onChange'> {
    error?: string | null;
    label: string;
    onChange?: (value: Array<string | number>) => void;
    clarification?: string;
    length: number;
    value?: Array<string | number>;
}

export function ArrayTextInput(props: ArrayTextInputProps): React.ReactElement {
    const {
        error,
        onChange,
        label,
        clarification,
        length,
        value,
        ...restProps
    } = props;
    const isInvalid = Boolean(error);
    const indexesArray = Array.from(Array(length).keys());
    const controlWidth = Math.floor(100 / length);
    const arrayValue = value || new Array(length);
    return (
        <Form.Group>
            <Form.Label>{label}</Form.Label>
            <div className={css.arrayControls}>
                {indexesArray.map(order =>
                    <ArrayControlField
                        key={String(order)}
                        order={order}
                        value={arrayValue}
                        onChange={onChange}
                        isInvalid={isInvalid}
                        width={controlWidth}
                        {...restProps}
                    />,
                )}
            </div>
            <Form.Text className={'text-muted'}>{clarification}</Form.Text>
            <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
        </Form.Group>
    );
}

interface ArrayControlFieldProps extends Omit<FormControlProps, 'onChange'> {
    order: number;
    value: Array<string | number>;
    onChange?: (value?: Array<string | number>) => void;
    width: number;
}

function ArrayControlField(props: ArrayControlFieldProps) {
    const { order, value, onChange, width, ...restProps } = props;
    const onChangeValue = React.useCallback(
        (inputEvent: SyntheticEvent<HTMLInputElement>) => {
            if (typeof onChange === 'function') {
                const nextValue = value.slice();
                nextValue[order] = inputEvent.currentTarget.value;
                onChange(nextValue);
            }
        }, [onChange, value]);
    // eslint-disable-next-line no-undefined
    const fieldValue = value[order] !== undefined ? String(value[order]) : undefined;
    return (
        <Form.Control
            className={css.control}
            value={fieldValue}
            onChange={onChangeValue}
            style={{
                flexBasis: width + '%',
            }}
            {...restProps}
        />
    );
}

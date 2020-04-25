import React from 'react';
import { ButtonGroup, ToggleButton, Form } from 'react-bootstrap';

interface RadioButtonProps {
    label?: string;
    labelOn: string;
    labelOff: string;
    value?: boolean;
    onChange: (value: boolean) => void;
}

export function RadioButton(props: RadioButtonProps): React.ReactElement {
    const { value = false, onChange, labelOn, labelOff, label } = props;
    const onCheck = React.useCallback((event: React.FormEvent<HTMLDivElement>) => {
        // @ts-ignore
        const { target: { value } } = event;
        onChange(Boolean(Number(value)));
    }, [onChange]);
    return (
        <Form.Group>
            <Form.Label>{label}</Form.Label>
            <div>
                <ButtonGroup
                    onChange={onCheck}
                    toggle
                >
                    <ToggleButton
                        type='radio'
                        variant={value ? 'success' : 'secondary'}
                        value={'1'}
                    >{labelOn}</ToggleButton>
                    <ToggleButton
                        type='radio'
                        variant={!value ? 'success' : 'secondary'}
                        value={'0'}
                    >{labelOff}</ToggleButton>
                </ButtonGroup>
            </div>
        </Form.Group>
    );
}

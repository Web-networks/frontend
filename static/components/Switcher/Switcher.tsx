import React from 'react';
import { Form } from 'react-bootstrap';

interface SwitcherProps extends Omit<React.ComponentProps<typeof Form.Check>, 'value' | 'onChange'> {
    value?: boolean;
    onChange: (value: boolean) => void;
}

export function Switcher(props: SwitcherProps): React.ReactElement {
    const { value = false, onChange, ...restProps } = props;
    const onCheck = React.useCallback(() => onChange(!value), [value, onChange]);
    return (
        <Form.Check
            checked={value}
            onChange={onCheck}
            {...restProps}
        />
    );
}

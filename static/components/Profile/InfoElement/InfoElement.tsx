import React from 'react';

import css from './InfoElement.module.css';

interface InfoElementProps {
    name: string;
    value: string;
}

export function InfoElement(props: InfoElementProps): React.ReactElement {
    const { name, value } = props;
    return (
        <div className={css.root}>
            <div className={css.name}>{`${name}:`}</div>
            <div className={css.value}>{value}</div>
        </div>
    );
}

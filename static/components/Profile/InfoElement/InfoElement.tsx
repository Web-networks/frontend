import React from 'react';

import css from './InfoElement.module.css';

interface InfoElementProps {
    name: string;
    value: string | null | undefined;
    title?: string;
}

const NO_INFO = '...';
const TITLE_NO_INFO = 'Edit to set your ';

export function InfoElement(props: InfoElementProps): React.ReactElement {
    const { name, value, title } = props;
    const fullTitle = !value && TITLE_NO_INFO + title || '';
    return (
        <div className={css.root}>
            <div className={css.name}>{`${name}:`}</div>
            <div className={css.value} title={fullTitle}>{value || NO_INFO}</div>
        </div>
    );
}

import React from 'react';

import css from './FormUI.module.css';

interface FormUIProps {
    children: React.ReactNode;
}

export function FormUI(props: FormUIProps) {
    const { children } = props;
    return (
        <div className={css.root}>
            {children}
        </div>
    );
}

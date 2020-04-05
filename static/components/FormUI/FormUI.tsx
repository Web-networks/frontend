import React from 'react';
import classnames from 'classnames';

import { Alert, Spinner } from 'react-bootstrap';
import css from './FormUI.module.css';

interface FormUIProps {
    children: React.ReactNode;
    error: string | null;
    pending: boolean;
    className?: string;
}

export function FormUI(props: FormUIProps) {
    const { children, error, pending, className } = props;
    return (
        <div className={classnames(css.root, className)}>
            <div className={css.errorMsg}>
                <Alert
                    variant='danger'
                    show={Boolean(error)}
                >{error}</Alert>
            </div>
            <div>
                {children}
            </div>
            {pending && <div className={css.pendingScrimer}>
                <Spinner
                    animation='border'
                    variant='primary'
                />
            </div>}
        </div>
    );
}

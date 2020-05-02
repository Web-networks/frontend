import React from 'react';
import { LeftPannel } from 'containers/PageLayout/LeftPannel/LeftPannel';

import css from './Layout.module.css';

interface OwnPropsT {
    children?: React.ReactNode;
}

export function Layout(props: OwnPropsT) {
    const { children } = props;
    return (
        <div className={css.root}>
            <LeftPannel/>
            <div className={css.content}>
                {children}
            </div>
        </div>
    );
}

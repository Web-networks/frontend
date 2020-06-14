import React from 'react';
import { LeftPannel } from 'containers/PageLayout/LeftPannel/LeftPannel';
import { withPendingState } from 'hocs/withPendingState';

import css from './Layout.module.css';

interface OwnPropsT {
    children?: React.ReactNode;
}

function LayoutComponent(props: OwnPropsT) {
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

export const Layout = withPendingState(LayoutComponent, 'user');

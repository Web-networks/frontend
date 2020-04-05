import React from 'react';

import { UserInfo } from 'containers/UserInfo/UserInfo';

import css from './Layout.module.css';

interface OwnPropsT {
    children?: React.ReactNode;
}

class Layout extends React.Component<OwnPropsT> {
    public render() {
        return (
            <div className={css.mainContent}>
                {this.renderHeader()}
                {this.renderContent()}
            </div>
        );
    }

    private renderHeader() {
        return (
            <div className={css.header}>
                <div className={css.logoText}>{'Neural networks IDEA'}</div>
                <div>
                    <UserInfo/>
                </div>
            </div>
        );
    }

    private renderContent() {
        const { children } = this.props;
        return (
            <div className={css.content}>
                {children}
            </div>
        );
    }
}

export default Layout;

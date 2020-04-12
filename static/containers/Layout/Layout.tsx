import React from 'react';

import { UserInfo } from 'containers/UserInfo/UserInfo';

import css from './Layout.module.css';
import { Link } from 'react-router-dom';

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
                <Link to='/' className={css.logoText}>
                    <div>{'Neural networks IDEA'}</div>
                </Link>
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
                <div className={css.innerPage}>
                    {children}
                </div>
            </div>
        );
    }
}

export default Layout;

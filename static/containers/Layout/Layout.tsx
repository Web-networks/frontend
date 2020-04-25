import React from 'react';
import { UserInfo } from 'containers/User/UserInfo/UserInfo';
import { Link } from 'react-router-dom';

import css from './Layout.module.css';

interface OwnPropsT {
    children?: React.ReactNode;
}

export class Layout extends React.Component<OwnPropsT> {
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
                    <div>{'WEB IDE'}</div>
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

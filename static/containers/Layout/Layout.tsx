import React from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

import css from './Layout.module.css';

interface OwnPropsT {
    children: React.ReactNode;
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
                <Link to='/sign/up'>
                    <Button
                        variant='primary'
                        className={css.buttonControl}
                    >{'Войти'}</Button>
                </Link>
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

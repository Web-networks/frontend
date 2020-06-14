import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import { ApplicationStateT, StateFieldKeyT } from 'types';

import css from './styles/withPendingState.module.css';

interface InjectedInProps {
    pendingFields: StateFieldKeyT[];
}

export function withPendingState<T>(Component: React.ComponentType<T>, ...dependsFields: StateFieldKeyT[]) {
    type OwnProps = Omit<T, keyof InjectedInProps>;
    type HocProps = T & InjectedInProps;
    function WithPendingState(props: HocProps) {
        const { pendingFields, ...restProps } = props;
        const isPending = Boolean(pendingFields.length);
        if (isPending) {
            return (
                <>
                    <Component
                        {...restProps as HocProps}
                    />
                    {ReactDOM.createPortal(
                        <Paranja />,
                        document.body,
                    )}
                </>
            );
        }
        return (
            <Component
                {...restProps as HocProps}
            />
        );
    }

    return connect<InjectedInProps, {}, OwnProps>(
        (state: ApplicationStateT) => ({
            pendingFields: Object.keys(state).reduce(
                (res: StateFieldKeyT[], stateField: StateFieldKeyT) => {
                    if (dependsFields.includes(stateField) && state[stateField].pending) {
                        return res.concat(stateField);
                    }
                    return res;
                }, []),
        }),
    )(WithPendingState as any);
}

interface ParanjaProps {
    anchor: HTMLElement | null;
}

function Paranja() {
    return (
        <div className={css.paranja}>
            <Spinner
                variant='info'
                animation='border'
            />
        </div>
    );
}

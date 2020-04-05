import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { formMount, formSubmit, formUnmount, StateField } from 'actions/formDataActions';
import { FormUIProps } from 'types/formDataTypes';
import { ApplicationStateT } from 'types/ApplicationStateT';
import { FormUI } from 'components/FormUI/FormUI';

interface SpaFormConnectProps {
    error: string | null;
    pending: boolean;
    onFormSubmit: (submitUrl: string, stateField: StateField) => void;
    onFormMount: () => void;
    onFormUnmount: () => void;
}


export function createSpaForm<T extends FormUIProps>(FormComponent: React.ComponentType<T>): React.ComponentType<T> {
    function SpaForm(props: T & SpaFormConnectProps) {
        const {
            onFormSubmit,
            onFormMount,
            onFormUnmount,
            submitUrl,
            stateField,
            error,
            pending,
        } = props;
        React.useEffect(() => {
            onFormMount();
        });
        React.useEffect(() => onFormUnmount, [onFormUnmount]);
        const submitForm = React.useCallback(
            () => onFormSubmit(submitUrl, stateField),
            [submitUrl, onFormSubmit, stateField],
        );

        return (
            <FormUI
                error={error}
                pending={pending}
            >
                <FormComponent {...props} submitForm={submitForm} />
            </FormUI>
        );
    }

    return connect(
        ({ form }: ApplicationStateT): Partial<SpaFormConnectProps> => ({
            error: form.error,
            pending: form.pending,
        }),
        (dispatch: Dispatch): Partial<SpaFormConnectProps> => ({
            onFormSubmit: (submitUrl: string, stateField: StateField) => dispatch(formSubmit(submitUrl, stateField)),
            onFormMount: () => dispatch(formMount()),
            onFormUnmount: () => dispatch(formUnmount()),
        }),
    )(SpaForm as any);
}



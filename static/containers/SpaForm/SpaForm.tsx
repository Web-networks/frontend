import * as React from 'react';
import { connect } from 'react-redux';
import { Diff } from 'utility-types';

import { formMount, formSubmit, formUnmount, StateField, formCancel } from 'actions/formActions';
import { ApplicationStateT } from 'types/ApplicationStateT';
import { FormUI } from 'components/FormUI/FormUI';
import { FormUIProps } from 'types/formTypes';

interface SpaFormStateProps {
    error: string | null;
    pending: boolean;
}

interface SpaFormDispatchProps {
    onFormSubmit: (submitUrl: string, stateField: StateField) => void;
    onFormCancel: () => void;
    onFormMount: () => void;
    onFormUnmount: () => void;
}

interface InjectedOutProps {
    submitUrl: string;
    stateField: StateField;
}

interface InjectedInProps {
    submitForm: FormUIProps['submitForm'];
    cancelForm: FormUIProps['cancelForm'];
}


export function createSpaForm<BaseProps extends FormUIProps>(FormComponent: React.ComponentType<BaseProps>) {
    type SpaFormProps = Diff<BaseProps & InjectedOutProps & SpaFormDispatchProps & SpaFormStateProps, InjectedInProps>;
    function SpaForm(props: SpaFormProps) {
        const {
            onFormSubmit,
            onFormMount,
            onFormUnmount,
            submitUrl,
            stateField,
            error,
            pending,
            onFormCancel,
        } = props;
        React.useEffect(() => {
            onFormMount();
        }, []);
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
                <FormComponent
                    cancelForm={onFormCancel}
                    submitForm={submitForm}
                    {...props as BaseProps} />
            </FormUI>
        );
    }

    SpaForm.displayName = `Spa${FormComponent.name}`;
    type OwnHocProps = Diff<SpaFormProps, SpaFormStateProps & SpaFormDispatchProps>;
    return connect<SpaFormStateProps, SpaFormDispatchProps, OwnHocProps>(
        ({ form }: ApplicationStateT, _) => ({
            error: form.error,
            pending: form.pending,
        }),
        dispatch => ({
            onFormSubmit: (submitUrl, stateField) => dispatch(formSubmit(submitUrl, stateField)),
            onFormMount: () => dispatch(formMount()),
            onFormUnmount: () => dispatch(formUnmount()),
            onFormCancel: () => dispatch(formCancel()),
        }),
    )(SpaForm as any);
}

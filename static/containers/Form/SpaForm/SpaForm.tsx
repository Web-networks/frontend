import * as React from 'react';
import { connect } from 'react-redux';
import { Diff } from 'utility-types';

import {
    formMount,
    formSubmit,
    formUnmount,
    formCancel,
    addFormData,
} from 'actions/formActions';
import { FormUI } from 'components/Form/FormUI/FormUI';
import { FormUIPropsT } from 'types/formTypes';
import { ApplicationStateT, StateFieldKeyT } from 'types';

interface SpaFormStateProps {
    error: string | null;
    pending: boolean;
    isSubmeted: boolean;
}

interface SpaFormDispatchProps {
    onFormSubmit: (submitUrl: string, stateField: StateFieldKeyT, redirectSuccessUrl?: string) => void;
    onFormCancel: () => void;
    onFormMount: () => void;
    onFormUnmount: () => void;
    addFormData: (additionalData: Record<string, any>) => void;
}

interface InjectedOutProps {
    submitUrl: string;
    stateField: StateFieldKeyT;
    redirectSuccessUrl?: string;
    additionalData?: Record<string, any>;
    callbackAfterSuccess?: Function;
}

interface InjectedInProps {
    submitForm: FormUIPropsT['submitForm'];
    cancelForm: FormUIPropsT['cancelForm'];
}


export function createSpaForm<BaseProps extends FormUIPropsT>(FormComponent: React.ComponentType<BaseProps>) {
    type SpaFormProps = Diff<BaseProps & InjectedOutProps & SpaFormDispatchProps & SpaFormStateProps, InjectedInProps>;
    function SpaForm(props: SpaFormProps) {
        const {
            onFormSubmit,
            onFormMount,
            onFormUnmount,
            submitUrl,
            stateField,
            redirectSuccessUrl,
            error,
            pending,
            onFormCancel,
            formClassName,
            callbackAfterSuccess,
            isSubmeted,
            addFormData,
            additionalData,
        } = props;
        React.useEffect(() => {
            onFormMount();
        }, []);
        React.useEffect(() => onFormUnmount, [onFormUnmount]);
        React.useEffect(() => {
            if (isSubmeted && callbackAfterSuccess) {
                callbackAfterSuccess();
            }
        }, [isSubmeted]);
        React.useEffect(() => {
            if (additionalData) {
                addFormData(additionalData);
            }
        }, [additionalData]);
        const submitForm = React.useCallback(
            () => onFormSubmit(submitUrl, stateField, redirectSuccessUrl),
            [submitUrl, onFormSubmit, stateField],
        );

        return (
            <FormUI
                error={error}
                pending={pending}
                className={formClassName}
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
            isSubmeted: form.isSubmeted,
        }),
        dispatch => ({
            onFormSubmit: (submitUrl, stateField, redirectSuccessUrl) => dispatch(formSubmit.emitRequest({
                url: submitUrl,
                stateField,
                redirectSuccessUrl,
            })),
            onFormMount: () => dispatch(formMount()),
            onFormUnmount: () => dispatch(formUnmount()),
            onFormCancel: () => dispatch(formCancel()),
            addFormData: additionalData => dispatch(addFormData(additionalData)),
        }),
    )(SpaForm as any);
}

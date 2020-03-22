import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { formMount, formSubmit, formUnmount } from 'actions/formDataActions';
import { FormUI } from 'types/formDataTypes';

interface SpaFormConnectProps {
    onFormSubmit: (submitUrl: string) => void;
    onFormMount: () => void;
    onFormUnmount: () => void;
}

export function createSpaForm<T extends FormUI>(FormComponent: React.ComponentType<T>): React.ComponentType<T> {
    function SpaForm(props: T & SpaFormConnectProps) {
        const { onFormSubmit, onFormMount, onFormUnmount, submitUrl } = props;
        onFormMount();

        React.useEffect(() => onFormUnmount, [onFormUnmount]);
        const submitForm = React.useCallback(() => onFormSubmit(submitUrl), [submitUrl, onFormSubmit]);

        return (
            <FormComponent {...props} submitForm={submitForm} />
        );
    }

    return connect(
        null,
        (dispatch: Dispatch): SpaFormConnectProps => ({
            onFormSubmit: (submitUrl: string) => dispatch(formSubmit(submitUrl)),
            onFormMount: () => dispatch(formMount()),
            onFormUnmount: () => dispatch(formUnmount()),
        }),
    )(SpaForm as any);
}



import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { addFieldForm, changeFieldForm } from 'actions/formDataActions';
import TextInput, { TextInputPropsT } from 'components/TextInput/TextInput';
import { ApplicationStateT } from 'types/ApplicationStateT';

interface StatePropsT {
    value: any;
    error: string | null;
}

interface DispatchPropsT {
    onChange: (value: any) => void;
    createField: (isRequired: boolean) => void;
}

interface OwnPropsT {
    fieldName: string;
    isRequired?: boolean;
}

type ExtendsPropsT = StatePropsT & DispatchPropsT & OwnPropsT;

function createSpaFormField<T extends OwnPropsT>(
    Component: React.ComponentType<T>,
): React.ComponentType<T & OwnPropsT> {
    function SpaFormField(props: T & ExtendsPropsT) {
        const { createField, isRequired = false } = props;
        React.useEffect(() => {
            createField(isRequired);
        });

        return (
            <Component {...props} />
        );
    }

    return connect(
        ({ form: { formData } }: ApplicationStateT, ownProps: T): StatePropsT => {
            const { fieldName } = ownProps;
            const { value, error = null } = formData[fieldName] || {};
            return { value, error };
        },
        (dispatch: Dispatch, ownProps: T): DispatchPropsT => {
            const { fieldName } = ownProps;
            return {
                createField: (isRequired: boolean) => dispatch(addFieldForm(fieldName, isRequired)),
                onChange: (value: any) => dispatch(changeFieldForm(fieldName, value)),
            };
        },
    )(SpaFormField);
}

export const FormTextInput = createSpaFormField<TextInputPropsT>(TextInput);

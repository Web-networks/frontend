import * as React from 'react';
import { connect } from 'react-redux';
import { Diff } from 'utility-types';

import { addFieldForm, changeFieldForm } from 'actions/formActions';
import { TextInput } from 'components/TextInput/TextInput';
import { UserSuggest } from 'containers/UserSuggest/UserSuggest';
import { Switcher } from 'components/Switcher/Switcher';
import { RadioButton } from 'components/RadioButton/RadioButton';
import { ApplicationStateT } from 'types/ApplicationStateT';

interface StatePropsT {
    value: any;
    error: string | null;
}

interface DispatchPropsT {
    onChange: (value: any) => void;
    createField: (fieldName: string, isRequired: boolean) => void;
}

interface InjectedPropsT {
    fieldName: string;
    isRequired?: boolean;
}

function createSpaFormField<BaseProps extends Object>(Component: React.ComponentType<BaseProps>) {
    type HocProps = BaseProps & InjectedPropsT & DispatchPropsT & StatePropsT;
    function SpaFormField(props: HocProps) {
        const {
            createField,
            fieldName,
            isRequired = false,
        } = props;
        React.useEffect(() => {
            createField(fieldName, isRequired);
        }, []);

        return (
            <Component {...props} />
        );
    }

    SpaFormField.displayName = `Form${Component.name}`;
    type OwnHocProps = Diff<BaseProps & InjectedPropsT, StatePropsT & DispatchPropsT>;
    return connect<StatePropsT, DispatchPropsT, OwnHocProps>(
        ({ form: { formData } }: ApplicationStateT, ownProps) => {
            const { fieldName } = ownProps;
            const { value, error = null } = formData[fieldName] || {};
            return { value, error };
        },
        (dispatch, ownProps) => {
            const { fieldName } = ownProps;
            return {
                createField: (fieldName, isRequired) => dispatch(addFieldForm(fieldName, isRequired)),
                onChange: value => dispatch(changeFieldForm(fieldName, value)),
            };
        },
    )(SpaFormField);
}

export const FormTextInput = createSpaFormField(TextInput);
export const FormUserSuggest = createSpaFormField(UserSuggest);
export const FormSwitcher = createSpaFormField(Switcher);
export const FormRadioButton = createSpaFormField(RadioButton);

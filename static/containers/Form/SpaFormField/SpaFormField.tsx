import * as React from 'react';
import { connect } from 'react-redux';
import { Diff } from 'utility-types';

import { addFieldForm, changeFieldForm } from 'actions/formActions';
import { TextInput } from 'components/Controls/TextInput/TextInput';
import { UserSuggest } from 'containers/User/UserSuggest/UserSuggest';
import { Switcher } from 'components/Controls/Switcher/Switcher';
import { RadioButton } from 'components/Controls/RadioButton/RadioButton';
import { ApplicationStateT } from 'types';

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
    defaultValue?: any;
}

function createSpaFormField<BaseProps extends Object>(Component: React.ComponentType<BaseProps>) {
    type HocProps = BaseProps & InjectedPropsT & DispatchPropsT & StatePropsT;
    function SpaFormField(props: HocProps) {
        const {
            createField,
            fieldName,
            isRequired = false,
            onChange,
            defaultValue,
        } = props;
        React.useEffect(() => {
            createField(fieldName, isRequired);
            // eslint-disable-next-line no-undefined
            if (defaultValue !== undefined) {
                onChange(defaultValue);
            }
        }, []);

        return (
            <Component {...props} />
        );
    }

    SpaFormField.displayName = `Form${Component.name}`;
    type OwnHocProps = Diff<BaseProps & InjectedPropsT, StatePropsT & DispatchPropsT>;
    return connect<StatePropsT, DispatchPropsT, OwnHocProps>(
        ({ form: { data } }: ApplicationStateT, ownProps) => {
            const { fieldName } = ownProps;
            const { value, error = null } = data[fieldName] || {};
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

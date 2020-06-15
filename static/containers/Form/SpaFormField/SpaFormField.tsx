import * as React from 'react';
import { connect } from 'react-redux';
import { Diff } from 'utility-types';

import { addFieldForm, changeFieldForm } from 'actions/formActions';
import { TextInput } from 'components/Controls/TextInput/TextInput';
import { UserSuggest } from 'containers/User/UserSuggest/UserSuggest';
import { Switcher } from 'components/Controls/Switcher/Switcher';
import { RadioButton } from 'components/Controls/RadioButton/RadioButton';
import { Typeahead } from 'components/Controls/Typeahead/Typeahead';
import { ApplicationStateT } from 'types';

interface StatePropsT {
    value: any;
    error: string | null;
}

interface DispatchPropsT {
    onChange: (value: any) => void;
    createField: (fieldName: string, isRequired: boolean, defaultValue?: any) => void;
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
            defaultValue,
        } = props;
        React.useEffect(() => {
            // eslint-disable-next-line no-undefined
            if (defaultValue !== undefined) {
                createField(fieldName, isRequired, defaultValue);
            } else {
                createField(fieldName, isRequired);
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
                createField: (fieldName, isRequired, defaultValue) => dispatch(
                    addFieldForm(fieldName, isRequired, defaultValue),
                ),
                onChange: value => dispatch(changeFieldForm(fieldName, value)),
            };
        },
    )(SpaFormField);
}

export const FormTextInput = createSpaFormField(TextInput);
export const FormUserSuggest = createSpaFormField(UserSuggest);
export const FormSwitcher = createSpaFormField(Switcher);
export const FormRadioButton = createSpaFormField(RadioButton);
export const FormTypeahead = createSpaFormField(Typeahead);

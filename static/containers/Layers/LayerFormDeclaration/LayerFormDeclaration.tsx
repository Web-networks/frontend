import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import { LayerDependsSettings, LayerType, FieldType } from 'settings/LayerDependsSettings';
import { FormUIPropsT } from 'types/formTypes';
import { createSpaForm } from 'containers/Form/SpaForm/SpaForm';
import {
    FormSwitcher,
    FormTextInput,
    FormTypeahead,
} from 'containers/Form/SpaFormField/SpaFormField';
import { ApplicationStateT } from 'types';

import css from './LayerFormDeclaration.module.css';

interface LayerFormDeclarationConnectedProps {
    type?: LayerType;
}

interface LayerFormDeclarationOwnProps extends FormUIPropsT {
    closeForm: () => void;
}

interface BaseControlType {
    fieldName: string;
    isRequired?: boolean;
    label?: string;
    clarification?: string;
    default?: any;
    options?: string[];
    type?: string;
}

const FieldComponents: Record<FieldType, React.ComponentType<BaseControlType>> = {
    select: FormTypeahead,
    string: FormTextInput,
    number: FormTextInput,
    boolean: FormSwitcher,
};

const controlTypes: Partial<Record<FieldType, string>> = {
    string: 'text',
    number: 'number',
};

type LayerFormDeclarationProps = LayerFormDeclarationOwnProps & LayerFormDeclarationConnectedProps;

function LayerFormDeclarationComponent(props: LayerFormDeclarationProps) {
    const { isReadyToSubmit, closeForm, submitForm, type: layerType } = props;
    return (
        <Form>
            <div>
                <FormTypeahead
                    fieldName='type'
                    isRequired={true}
                    label={'Layer type'}
                    options={Object.keys(LayerDependsSettings)}
                    maxSuggestHeight={200}
                />
                {layerType && Object.keys(LayerDependsSettings[layerType]).map(paramName => {
                    const setting = LayerDependsSettings[layerType][paramName];
                    const Control = FieldComponents[setting.fieldType];
                    const fieldName = `params.${paramName}`;
                    return (
                        <Control
                            key={fieldName}
                            fieldName={fieldName}
                            isRequired={setting.required}
                            label={setting.label}
                            clarification={setting.clarification}
                            options={setting.options}
                            default={setting.default}
                            type={controlTypes[setting.fieldType]}
                        />
                    );
                })}
                <div className={css.buttons}>
                    <Button variant='secondary' onClick={closeForm}>{'Close'}</Button>
                    <Button variant='success' onClick={submitForm} disabled={!isReadyToSubmit}>{'Submit'}</Button>
                </div>
            </div>
        </Form>
    );
}

export const LayerFormDeclaration = connect<LayerFormDeclarationConnectedProps>(
    ({ form }: ApplicationStateT) => ({
        type: form.data.type?.value,
    }),
)(createSpaForm(LayerFormDeclarationComponent));


import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import { LayerDependsSettings, LayerType, FieldType, FormFieldSetting } from 'settings/LayerDependsSettings';
import { FormUIPropsT } from 'types/formTypes';
import { createSpaForm } from 'containers/Form/SpaForm/SpaForm';
import {
    FormSwitcher,
    FormTextInput,
    FormTypeahead,
    FormArrayTextInput,
} from 'containers/Form/SpaFormField/SpaFormField';
import { LayerT } from 'types/layersTypes';
import { layerRemove } from 'actions/layersActions';
import { ApplicationStateT } from 'types';

import css from './LayerFormDeclaration.module.css';

interface LayerFormDeclarationConnectedProps {
    type?: LayerType;
}

interface LayerFormDeclarationDispatchProps {
    onLayerRemove: (id: string) => void;
}

interface LayerFormDeclarationOwnProps extends FormUIPropsT {
    closeForm: () => void;
    layer?: LayerT;
}

interface BaseControlType extends Omit<FormFieldSetting, 'required' | 'default' | 'fieldType'> {
    fieldName: string;
    isRequired?: boolean;
    defaultValue: any;
    type?: string;
}

const FieldComponents: Record<FieldType, React.ComponentType<BaseControlType>> = {
    input: FormTextInput,
    boolean: FormSwitcher,
    array: FormArrayTextInput,
    // @ts-ignore TODO: soleve problem
    select: FormTypeahead,
};

type LayerFormDeclarationProps = LayerFormDeclarationOwnProps
& LayerFormDeclarationConnectedProps
& LayerFormDeclarationDispatchProps;

function LayerFormDeclarationComponent(props: LayerFormDeclarationProps) {
    const {
        isReadyToSubmit,
        closeForm,
        submitForm,
        type: layerType,
        layer,
        onLayerRemove,
    } = props;
    const isCreation = !layer;
    const sumbitTextButton = isCreation ? 'Create' : 'Edit';
    const onRemoveButtonClick = React.useCallback(() => {
        if (!layer) {
            return;
        }
        onLayerRemove(layer.id);
        closeForm();
    }, [onLayerRemove, layer, closeForm]);
    return (
        <Form>
            <div>
                <FormTypeahead
                    fieldName='type'
                    isRequired={true}
                    label={'Layer type'}
                    options={Object.keys(LayerDependsSettings)}
                    maxSuggestHeight={200}
                    defaultValue={layer?.type}
                />
                {layerType && Object.keys(LayerDependsSettings[layerType]).map(paramName => {
                    const setting = LayerDependsSettings[layerType][paramName];
                    const Control = FieldComponents[setting.fieldType];
                    const fieldName = `params.${paramName}`;
                    const { default: settingDefault, required, ...restProps } = setting;
                    const defaultValue = layer?.params[paramName] || settingDefault;
                    return (
                        <Control
                            key={fieldName}
                            fieldName={fieldName}
                            defaultValue={defaultValue}
                            isRequired={required}
                            {...restProps}
                        />
                    );
                })}
                <div className={css.buttons}>
                    <Button variant='secondary' onClick={closeForm}>{'Close'}</Button>
                    {!isCreation && <Button variant='danger' onClick={onRemoveButtonClick}>{'Remove'}</Button>}
                    <Button
                        variant='success'
                        onClick={submitForm}
                        disabled={!isReadyToSubmit}>{sumbitTextButton}</Button>
                </div>
            </div>
        </Form>
    );
}

export const LayerFormDeclaration = connect<LayerFormDeclarationConnectedProps, LayerFormDeclarationDispatchProps>(
    ({ form }: ApplicationStateT) => ({
        type: form.data.type?.value,
    }),
    dispatch => ({
        onLayerRemove: id => dispatch(layerRemove.emitRequest({ id })),
    }),
)(createSpaForm(LayerFormDeclarationComponent));


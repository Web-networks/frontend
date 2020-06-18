import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Image, Button } from 'react-bootstrap';

import { ApplicationStateT } from 'types';
import { ModelT } from 'types/modelTypes';
import { modelRemove } from 'actions/modelActions';
import { ModelForm } from 'containers/ProjectArea/ModelForm/ModelForm';
import { LayerBlock } from 'components/Layers/LayerBlock/LayerBlock';
import { layersFetch } from 'actions/layersActions';
import { LayerT } from 'types/layersTypes';

import NerveImage from './icons/nerve.svg';
import DeleteImage from './icons/delete.svg';

import css from './ModelEditingPage.module.css';

interface ModelEditingPageConnectProps {
    model: ModelT;
    layers?: LayerT[] | null;
}

interface ModelEditingPageDispatchProps {
    onRemoveModel: () => void;
    fetchLayers: (modelId: string) => void;
}

interface ModelEditingPageOwnProps {
}

type ModelEditingPageProps = ModelEditingPageConnectProps & ModelEditingPageDispatchProps & ModelEditingPageOwnProps;

function ModelEditingPageComponent(props: ModelEditingPageProps): React.ReactElement {
    const {
        model,
        onRemoveModel,
        fetchLayers,
        layers,
    } = props;
    const [openedModelForm, toggleModelForm] = React.useState<boolean>(false);
    React.useEffect(() => {
        fetchLayers(model.id);
    }, []);
    const closeModelForm = React.useCallback(() => toggleModelForm(false), [toggleModelForm]);
    const openModelForm = React.useCallback(() => toggleModelForm(true), [toggleModelForm]);
    return (
        <div className={css.root}>
            <div className={css.header}>
                <Image
                    src={NerveImage}
                    width={70}
                    height={70}
                />
                <div className={css.modelParam}>
                    <strong>{'Loss function: '}</strong>
                    <span>{model.loss}</span>
                </div>
                <div className={css.modelParam}>
                    <strong>{'Optimizer: '}</strong>
                    <span>{model.optimizer}</span>
                </div>
                <div className={css.modelParam}>
                    <strong>{'Metrics: '}</strong>
                    <span>{model.metrics}</span>
                </div>
                <Button
                    className={css.button}
                    variant='warning'
                    onClick={openModelForm}
                >{'Edit'}</Button>
                <Button className={css.button} variant='success'>{'Learn'}</Button>
                <Image
                    className={classnames(css.button, css.deleteButton)}
                    src={DeleteImage}
                    width={40}
                    height={40}
                    onClick={onRemoveModel}
                />
                <ModelForm
                    opened={openedModelForm}
                    closeForm={closeModelForm}
                    isEditing={true}
                />
            </div>
            <div className={css.layers}>
                {layers && layers.map(layer =>
                    <LayerBlock
                        key={layer.id}
                        layer={layer}
                    />,
                )}
                <LayerBlock />
            </div>
        </div>
    );
}

// eslint-disable-next-line max-len
export const ModelEditingPage = connect<ModelEditingPageConnectProps, ModelEditingPageDispatchProps, ModelEditingPageOwnProps>(
    ({ model, layers }: ApplicationStateT) => ({
        model: model.data!,
        layers: layers.data,
    }),
    dispatch => ({
        onRemoveModel: () => dispatch(modelRemove.emitRequest({})),
        fetchLayers: modelId => dispatch(layersFetch.emitRequest({ model: modelId })),
    }),
)(ModelEditingPageComponent);

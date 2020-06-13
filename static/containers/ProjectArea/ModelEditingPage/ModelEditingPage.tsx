import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Image, Button } from 'react-bootstrap';
import { ApplicationStateT } from 'types';
import { ModelT } from 'types/modelTypes';
import { modelRemove } from 'actions/modelActions';

import NerveImage from './icons/nerve.svg';
import DeleteImage from './icons/delete.svg';

import css from './ModelEditingPage.module.css';

interface ModelEditingPageConnectProps {
    model: ModelT;
}

interface ModelEditingPageDispatchProps {
    onRemoveModel: () => void;
}

interface ModelEditingPageOwnProps {
}

type ModelEditingPageProps = ModelEditingPageConnectProps & ModelEditingPageDispatchProps & ModelEditingPageOwnProps;

function ModelEditingPageComponent(props: ModelEditingPageProps): React.ReactElement {
    const { model, onRemoveModel } = props;
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
                <Button className={css.button} variant='warning'>{'Edit'}</Button>
                <Button className={css.button} variant='success'>{'Learn'}</Button>
                <Image
                    className={classnames(css.button, css.deleteButton)}
                    src={DeleteImage}
                    width={40}
                    height={40}
                    onClick={onRemoveModel}
                />
            </div>
        </div>
    );
}

// eslint-disable-next-line max-len
export const ModelEditingPage = connect<ModelEditingPageConnectProps, ModelEditingPageDispatchProps, ModelEditingPageOwnProps>(
    ({ model }: ApplicationStateT) => ({
        model: model.data!,
    }),
    dispatch => ({
        onRemoveModel: () => dispatch(modelRemove.emitRequest({})),
    }),
)(ModelEditingPageComponent);

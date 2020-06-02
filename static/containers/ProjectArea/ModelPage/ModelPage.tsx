import React from 'react';
import { Image, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import ModelImage from './icons/model.svg';

import css from './ModelPage.module.css';

interface ModelPageConnectProps {
}

interface ModelPageDispatchProps {
}

interface ModelPageOwnProps {
}

type ModelPageProps = ModelPageConnectProps & ModelPageDispatchProps & ModelPageOwnProps;

function ModelPageComponent(): React.ReactElement {
    return (
        <div className={css.root}>
            <Image src={ModelImage} width={80} height={80} className={css.modelImage} />
            <Button variant='success'>{'Add new layer'}</Button>
        </div>
    );
}

export const ModelPage = connect<ModelPageConnectProps, ModelPageDispatchProps, ModelPageOwnProps>(
    null,
)(ModelPageComponent);

import React from 'react';
import { Image } from 'react-bootstrap';
import classnames from 'classnames';

import { LayerT } from 'types/layersTypes';
import { LayerForm } from 'containers/Layers/LayerForm/LayerForm';
import { LayerType } from 'settings/LayerDependsSettings';

import css from './LayerBlock.module.css';
import CoreLayerImage from './icons/core-layers.svg';
import ConvLayerImage from './icons/convolutional-layers.svg';
import PoolingLayerImage from './icons/pooling-layers.svg';

interface LayerBlockProps {
    layer?: LayerT;
}

const layerIcons: Record<LayerType, string> = {
    Dense: CoreLayerImage,
    Dropout: CoreLayerImage,
    Conv2D: ConvLayerImage,
    Flatten: ConvLayerImage,
    MaxPooling2D: PoolingLayerImage,
};

export function LayerBlock(props: LayerBlockProps): React.ReactElement {
    const { layer } = props;
    const text = layer?.type.toUpperCase() || 'ADD LAYER';
    const isEmpty = !layer;
    const [formOpened, setFormOpened] = React.useState(false);
    const closeForm = React.useCallback(() => setFormOpened(false), [setFormOpened]);
    const openForm = React.useCallback(() => setFormOpened(true), [setFormOpened]);
    const icon = layer && layerIcons[layer.type];
    return (
        <>
            <div onClick={openForm} className={classnames(css.root, { [css.emptyBlock]: isEmpty })}>
                {icon && <Image src={icon} className={css.layerIcon} />}
                <span>{text}</span>
            </div>
            <LayerForm
                isOpened={formOpened}
                closeForm={closeForm}
                layer={layer}
            />
        </>
    );
}

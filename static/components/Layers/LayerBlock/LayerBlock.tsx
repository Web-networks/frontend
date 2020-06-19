import React from 'react';
import { Image } from 'react-bootstrap';

import { LayerT } from 'types/layersTypes';
import { LayerForm } from 'containers/Layers/LayerForm/LayerForm';
import { LayerType } from 'settings/LayerDependsSettings';

import css from './LayerBlock.module.css';
import CoreLayerImage from './icons/core-layers.svg';

interface LayerBlockProps {
    layer?: LayerT;
}

const layerIcons: Record<LayerType, string> = {
    Dense: CoreLayerImage,
};

export function LayerBlock(props: LayerBlockProps): React.ReactElement {
    const { layer } = props;
    const text = layer?.type.toUpperCase() || 'ADD LAYER';
    const [formOpened, setFormOpened] = React.useState(false);
    const closeForm = React.useCallback(() => setFormOpened(false), [setFormOpened]);
    const openForm = React.useCallback(() => setFormOpened(true), [setFormOpened]);
    const icon = layer && layerIcons[layer.type];
    return (
        <>
            <div onClick={openForm} className={css.root}>
                {icon && <Image src={icon} className={css.layerIcon} />}
                <span>{text}</span>
            </div>
            <LayerForm
                isOpened={formOpened}
                closeForm={closeForm}
            />
        </>
    );
}

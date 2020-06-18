import React from 'react';

import { LayerT } from 'types/layersTypes';
import { LayerForm } from 'containers/Layers/LayerForm/LayerForm';

import css from './LayerBlock.module.css';

interface LayerBlockProps {
    layer?: LayerT;
}

export function LayerBlock(props: LayerBlockProps): React.ReactElement {
    const { layer } = props;
    const text = layer?.type.toUpperCase() || 'ADD LAYER';
    const [formOpened, setFormOpened] = React.useState(false);
    const closeForm = React.useCallback(() => setFormOpened(false), [setFormOpened]);
    const openForm = React.useCallback(() => setFormOpened(true), [setFormOpened]);
    return (
        <div onClick={openForm} className={css.root}>
            <div>{text}</div>
            <LayerForm
                isOpened={formOpened}
                closeForm={closeForm}
            />
        </div>
    );
}

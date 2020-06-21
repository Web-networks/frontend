import React from 'react';
import { Image } from 'react-bootstrap';
import classnames from 'classnames';

import { LayerBlock } from 'components/Layers/LayerBlock/LayerBlock';
import { LayerT } from 'types/layersTypes';
import ArrowRight from './icons/right-arrow.svg';

import css from './LayersPreview.module.css';

interface LayersPreviewProps {
    layers: LayerT[];
}

function splitForGroups<T>(array: T[], maxNumberInGroup: number) {
    const len = array.length;
    let i = 0;
    const groups = [];
    while (i < len) {
        groups.push(array.slice(i, i + maxNumberInGroup));
        i += maxNumberInGroup;
    }
    return groups;
}

export function LayersPreview(props: LayersPreviewProps): React.ReactElement {
    const { layers } = props;
    const N = 4;
    const layersWithEmptyLayer: Array<LayerT | null> = [...layers, null];
    const layersGroups = splitForGroups(layersWithEmptyLayer, N);
    return (
        <div className={css.root}>
            {layersGroups.map((group, groupIndex) =>
                <>
                    <div
                        className={classnames(css.groupColumn, {
                            [css.reverseColumn]: groupIndex % 2 === 1,
                        })}
                        key={String(groupIndex)}
                    >
                        {group.map((layer, layerIndex) =>
                            <>
                                {layer && <LayerBlock key={layer.id} layer={layer} /> || <LayerBlock/>}
                                {layerIndex + 1 !== group.length && <Image src={ArrowRight} className={css.arrowDown}/>}
                            </>,
                        )}
                    </div>
                    {groupIndex + 1 !== layersGroups.length &&
                        <div className={classnames(css.emptyGroup, {
                            [css.emptyGroupReverse]: groupIndex % 2 === 1,
                        })}>
                            <div className={css.arrowRightWrapper}>
                                <Image src={ArrowRight} className={css.arrowRight} />
                            </div>
                        </div>
                    }
                </>,
            )}
        </div>
    );
}

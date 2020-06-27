import { createAction } from 'redux-actions';
import { makeFetchableAction, MinEmitFetchActionPayloadT, EmitFetchActionT } from 'actions/utils';

export interface LayersFetchEmitPayloadT extends MinEmitFetchActionPayloadT {
    model: string;
}
export type LayersFetchEmitRequestActionT = EmitFetchActionT<LayersFetchEmitPayloadT>;
export const [
    LAYERS_FETCH,
    layersFetch,
] = makeFetchableAction<LayersFetchEmitPayloadT>('LAYERS_FETCH');

export interface LayerRemoveEmitRequestPayloadT extends MinEmitFetchActionPayloadT {
    id: string;
}
export type LayerRemoveEmitRequestActionT = EmitFetchActionT<LayerRemoveEmitRequestPayloadT>;
export const [
    LAYER_REMOVE,
    layerRemove,
] = makeFetchableAction<LayerRemoveEmitRequestPayloadT>('LAYER_REMOVE');

export const CLEAN_LAYERS = 'CLEAN_LAYERS';
export const cleanLayers = createAction(CLEAN_LAYERS);

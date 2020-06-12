import { makeFetchableAction, MinEmitFetchActionPayloadT, EmitFetchActionT } from 'actions/utils';

export interface LayersEmitPayloadT extends MinEmitFetchActionPayloadT {
    model: string;
}
export type LayersEmitRequestActionT = EmitFetchActionT<LayersEmitPayloadT>;
export const [
    LAYERS_FETCH,
    layersFetch,
] = makeFetchableAction<LayersEmitPayloadT>('LAYERS_FETCH');

import { makeFetchableAction, MinEmitFetchActionPayloadT, EmitFetchActionT } from 'actions/utils';

export interface LayersFetchEmitPayloadT extends MinEmitFetchActionPayloadT {
    model: string;
}
export type LayersFetchEmitRequestActionT = EmitFetchActionT<LayersFetchEmitPayloadT>;
export const [
    LAYERS_FETCH,
    layersFetch,
] = makeFetchableAction<LayersFetchEmitPayloadT>('LAYERS_FETCH');

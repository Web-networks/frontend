import { makeFetchableAction, MinEmitFetchActionPayloadT, EmitFetchActionT } from 'actions/utils';

export interface ModelFetchEmitRequestPayloadT extends MinEmitFetchActionPayloadT {
    project: string;
}
export type ModelFetchEmitRequestActionT = EmitFetchActionT<ModelFetchEmitRequestPayloadT>;
export const [
    MODEL_FETCH,
    modelFetch,
] = makeFetchableAction<ModelFetchEmitRequestPayloadT>('MODEL_FETCH');

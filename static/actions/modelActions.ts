import { makeFetchableAction, MinEmitFetchActionPayloadT, EmitFetchActionT } from 'actions/utils';

export interface ModelEmitPayloadT extends MinEmitFetchActionPayloadT {
    project: string;
}
export type ModelEmitRequestActionT = EmitFetchActionT<ModelEmitPayloadT>;
export const [
    MODEL_FETCH,
    modelFetch,
] = makeFetchableAction<ModelEmitPayloadT>('MODEL_FETCH');

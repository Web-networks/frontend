import { createAction } from 'redux-actions';
import { makeFetchableAction, MinEmitFetchActionPayloadT, EmitFetchActionT } from 'actions/utils';

export interface ModelFetchEmitRequestPayloadT extends MinEmitFetchActionPayloadT {
    project: string;
}
export type ModelFetchEmitRequestActionT = EmitFetchActionT<ModelFetchEmitRequestPayloadT>;
export const [
    MODEL_FETCH,
    modelFetch,
] = makeFetchableAction<ModelFetchEmitRequestPayloadT>('MODEL_FETCH');

export const [MODEL_REMOVE, modelRemove] = makeFetchableAction('MODEL_REMOVE');

export const CLEAN_MODEL = 'CLEAN_MODEL';
export const cleanModel = createAction(CLEAN_MODEL);

import { makeFetchableAction, MinEmitFetchActionPayloadT, EmitFetchActionT } from 'actions/utils';

export interface LearningTaskFetchEmitRequestPayloadT extends MinEmitFetchActionPayloadT {}
export type LearningTaskFetchEmitRequestActionT = EmitFetchActionT<LearningTaskFetchEmitRequestPayloadT>;
export const [
    LEARNING_TASK_FETCH,
    learningTaskFetch,
] = makeFetchableAction<LearningTaskFetchEmitRequestPayloadT>('LEARNING_TASK_FETCH');

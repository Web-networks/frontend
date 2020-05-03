import { makeFetchableAction, MinEmitFetchActionPayloadT, EmitFetchActionT } from 'actions/utils';

export interface CurrentProjectEmitPayloadT extends MinEmitFetchActionPayloadT {
    project: string;
    user: string;
}
export type CurrentProjectEmitRequestActionT = EmitFetchActionT<CurrentProjectEmitPayloadT>;
export const [
    CURRENT_PROJECT_FETCH,
    currentProjectFetch,
] = makeFetchableAction<CurrentProjectEmitPayloadT>('CURRENT_PROJECT_FETCH');

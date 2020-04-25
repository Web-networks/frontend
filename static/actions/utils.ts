import { Action } from 'redux-actions';
import { partial } from 'lodash';

interface FetchableActionT {
    EMIT_REQUEST: string;
    REQUEST_START: string;
    REQUEST_FAILURE: string;
    REQUEST_SUCCESS: string;
    REQUEST_END: string;
}

export interface MinEmitFetchActionPayloadT {
    action: FetchableActionT;
}

export type EmitFetchActionT<Payload extends MinEmitFetchActionPayloadT> = Action<Payload>;
export type RequestStartFetchActionT = Action<{}>;
export type FailureFetchActionT = Action<{message: string}>;
export type SuccesFetchActionT = Action<{body: any}>;
export type RequestEndFetchActionT = Action<{}>;

interface FetchableFuncActionT<Payload extends MinEmitFetchActionPayloadT> {
    emitRequest: (payload: Omit<Payload, 'action'>) => EmitFetchActionT<Payload>;
    requestStart: () => RequestStartFetchActionT;
    requestFailure: (message: string) => FailureFetchActionT;
    requestSuccess: (body: any) => SuccesFetchActionT;
    requestEnd: () => RequestEndFetchActionT;
}


export function makeFetchableAction<Payload extends MinEmitFetchActionPayloadT>(
    action: string,
): [FetchableActionT, FetchableFuncActionT<Payload>] {
    const fetchableAction = {
        EMIT_REQUEST: `${action}.EMIT_REQUEST`,
        REQUEST_START: `${action}.REQUEST_START`,
        REQUEST_END: `${action}.REQUEST_END`,
        REQUEST_SUCCESS: `${action}.REQUEST_SUCCESS`,
        REQUEST_FAILURE: `${action}.REQUESR_FAILURE`,
    };
    const actionFunctions = {
        emitRequest: partial(emitFetchAction, fetchableAction),
        requestStart: partial(requestStartFetchAction, fetchableAction),
        requestEnd: partial(requestEndFetchAction, fetchableAction),
        requestSuccess: partial(requestSuccessFetchAction, fetchableAction),
        requestFailure: partial(requestFailureFetchAction, fetchableAction),
    };

    return [fetchableAction, actionFunctions];
}

function emitFetchAction<Payload extends Omit<MinEmitFetchActionPayloadT, 'action'>>(
    action: FetchableActionT,
    payload: Payload,
): EmitFetchActionT<Payload & MinEmitFetchActionPayloadT> {
    return { type: action.EMIT_REQUEST, payload: { ...payload, action } };
}

function requestStartFetchAction(action: FetchableActionT): RequestStartFetchActionT {
    return { type: action.REQUEST_START, payload: {} };
}

function requestSuccessFetchAction(action: FetchableActionT, body: Object): SuccesFetchActionT {
    return { type: action.REQUEST_SUCCESS, payload: { body } };
}

function requestFailureFetchAction(action: FetchableActionT, message: string): FailureFetchActionT {
    return { type: action.REQUEST_FAILURE, payload: { message } };
}

function requestEndFetchAction(action: FetchableActionT): Action<{}> {
    return { type: action.REQUEST_END, payload: {} };
}

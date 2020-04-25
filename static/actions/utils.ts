import { Action } from 'redux-actions';

interface FetchableActionT {
    EMIT_REQUEST: string;
    REQUEST_START: string;
    REQUEST_FAILURE: string;
    REQUEST_SUCCESS: string;
    REQUEST_END: string;
}

export type FailureFetchAction = Action<{message: string}>;
export type SuccesFetchAction = Action<{body: Object}>;

export function makeFetchableAction(action: string): FetchableActionT {
    return {
        EMIT_REQUEST: `${action}.EMIT_REQUEST`,
        REQUEST_START: `${action}.REQUEST_START`,
        REQUEST_END: `${action}.REQUEST_END`,
        REQUEST_SUCCESS: `${action}.REQUEST_SUCCESS`,
        REQUEST_FAILURE: `${action}.REQUESR_FAILURE`,
    };
}

export function successFetchAction(action: FetchableActionT, body: Object): SuccesFetchAction {
    return { type: action.REQUEST_SUCCESS, payload: { body } };
}

export function failureFetchAction(action: FetchableActionT, message: string): FailureFetchAction {
    return { type: action.REQUEST_FAILURE, payload: { message } };
}

export function requestEndAction(action: FetchableActionT): Action<{}> {
    return { type: action.REQUEST_END, payload: {} };
}

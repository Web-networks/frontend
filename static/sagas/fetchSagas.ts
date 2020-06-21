import axios from 'axios';
import { put } from 'redux-saga/effects';
import {
    RequestStartFetchActionT,
    FailureFetchActionT,
    SuccesFetchActionT,
    RequestEndFetchActionT,
} from 'actions/utils';
import { addNotification, AddNotifictionPayloadT } from 'actions/notificationsActions';

interface FetchSagaOptionsT {
    body?: Object;
    queryParams?: Object;
    successNotification?: AddNotifictionPayloadT;
}

interface BaseType {
    requestStart: () => RequestStartFetchActionT;
    requestFailure: (message: string) => FailureFetchActionT;
    requestSuccess: (body: any) => SuccesFetchActionT;
    requestEnd: () => RequestEndFetchActionT;
}

export function* fetchSaga<T extends BaseType>(actionCreator: T, url: string, options?: FetchSagaOptionsT) {
    yield put(actionCreator.requestStart());
    try {
        const response = options?.body
            ? yield axios.post(url, {
                ...options.body,
            })
            : yield axios.get(url, {
                params: options?.queryParams,
            });
        yield put(actionCreator.requestSuccess(response.data || null));
        if (options?.successNotification) {
            yield put(addNotification(options.successNotification));
        }
        return response.data;
    } catch (error) {
        const errMessage = error.response.data.message
            || error.response.data.error
            || error.toString();
        console.error(error);
        yield put(addNotification({ type: 'danger', text: errMessage }));
        yield put(actionCreator.requestFailure(errMessage));
        // return "false" if failed
        return false;
    } finally {
        yield put(actionCreator.requestEnd());
    }
}

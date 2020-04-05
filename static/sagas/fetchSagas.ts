import { post } from 'lib/query';

export function* postSaga(url: string, body?: Object) {
    const response = yield post(url, body);
    return response;
}

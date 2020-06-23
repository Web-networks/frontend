import { ApplicationStateT } from 'types';
import { ModelT } from 'types/modelTypes';

export function modelDataSelector(state: ApplicationStateT): ModelT {
    const { model } = state;
    if (!model.data) {
        throw new Error('No found model');
    }
    return Object.assign({}, model.data);
}

export function modelTaskSelector(state: ApplicationStateT): string | void {
    const { model } = state;
    // console.log(model.data);
    return model.data?.task;
}

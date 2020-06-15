import { ApplicationStateT } from 'types';
import { ModelT } from 'types/modelTypes';

export function modelDataSelector(state: ApplicationStateT): ModelT {
    const { model } = state;
    if (!model.data) {
        throw new Error('No found model');
    }
    return Object.assign({}, model.data);
}

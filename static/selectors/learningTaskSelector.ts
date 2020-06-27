import { ApplicationStateT } from 'types';

export function learningTaskSelector(state: ApplicationStateT) {
    return state.learningTask.data;
}

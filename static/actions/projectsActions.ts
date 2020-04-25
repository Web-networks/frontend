import { Action } from 'redux-actions';
import { makeFetchableAction } from './utils';

export const PROJECTS_FETCH = makeFetchableAction('PROJECTS_FETCH');
export function fetchProjects(): Action<{}> {
    return { type: PROJECTS_FETCH.EMIT_REQUEST, payload: {} };
}


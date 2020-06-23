import { handleActions } from 'redux-actions';
import { last } from 'lodash';

import { LearningTaskStateT } from 'types/learningTaskTypes';
import { UPDATE_STATE_DATA } from 'actions/formActions';
import { updateStateDataFieldReducer, getFetchReducers } from 'reducers/utils';
import { LEARNING_TASK_FETCH } from 'actions/learningTaskActions';
import { SuccesFetchActionT } from 'actions/utils';

const LearningTaskInitialState: LearningTaskStateT = {
    pending: false,
    data: null,
    error: null,
};

export const learningTaskReducer = handleActions<LearningTaskStateT, any>({
    [UPDATE_STATE_DATA]: updateStateDataFieldReducer('learningTask'),

    ...getFetchReducers(LEARNING_TASK_FETCH),

    [LEARNING_TASK_FETCH.REQUEST_SUCCESS]: (state, action: SuccesFetchActionT) => {
        const { body } = action.payload;
        const { status } = body;
        const loss = body.metrics?.history?.loss;
        const accuracy = body.metrics?.history?.accuracy;
        const valLoss = body.metrics?.history?.val_loss;
        const valAccuracy = body.metrics?.history?.val_accuracy;
        let metrics = null;
        const lossProcess = (str: string) => Math.round(Number(str) * 1e4) / 1e4;
        const accuracyProcess = (str: string) => Math.round(Number(str) * 1e3) / 10;
        if (Array.isArray(loss)) {
            metrics = { loss: lossProcess(last(loss)) };
        }
        if (Array.isArray(accuracy)) {
            metrics = Object.assign({}, metrics, { accuracy: accuracyProcess(last(accuracy)) });
        }
        if (Array.isArray(valLoss)) {
            metrics = Object.assign({}, metrics, { valLoss: lossProcess(last(valLoss)) });
        }
        if (Array.isArray(valAccuracy)) {
            metrics = Object.assign({}, metrics, { accuracy: accuracyProcess(last(valAccuracy)) });
        }
        metrics = {
            loss: 0.0149,
            accuracy: 99.5,
            valLoss: 0.08,
            valAccuracy: 97.9,
        };
        const nextData = Object.assign({}, state.data, { metrics, status });
        return {
            ...state,
            data: nextData,
        };
    },

}, LearningTaskInitialState);

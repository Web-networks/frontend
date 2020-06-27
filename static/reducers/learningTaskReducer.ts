import { handleActions } from 'redux-actions';
import { last } from 'lodash';

import { LearningTaskStateT } from 'types/learningTaskTypes';
import { UPDATE_STATE_DATA } from 'actions/formActions';
import { updateStateDataFieldReducer, getFetchReducers } from 'reducers/utils';
import { LEARNING_TASK_FETCH, CLEAN_LEARNING_TASK } from 'actions/learningTaskActions';
import { SuccesFetchActionT } from 'actions/utils';

const LearningTaskInitialState: LearningTaskStateT = {
    pending: false,
    data: null,
    error: null,
};

interface TaskResultsHistory {
    loss?: string[];
    accuracy?: string[];
    valLoss?: string[];
    valAccuracy?: string[];
}

function getGraphicsData(taskResults: TaskResultsHistory) {
    const basicSettings = {
        type: 'line',
        xAxis: {
            title: 'Number of epoch',
        },
        xGrid: {
            enabled: true,
        },
        yGrid: {
            enabled: true,
        },
    };
    const res = [];
    if (taskResults.accuracy) {
        const data = taskResults.accuracy.map((val, index) => [`Epoch ${index + 1}`, Number(val)]);
        res.push({
            ...basicSettings,
            title: 'Accuracy',
            data,
        });
    }
    if (taskResults.loss) {
        const data = taskResults.loss.map((val, index) => [`Epoch ${index + 1}`, Number(val)]);
        res.push({
            ...basicSettings,
            title: 'Loss',
            data,
        });
    }
    if (taskResults.valAccuracy) {
        const data = taskResults.valAccuracy.map((val, index) => [`Epoch ${index + 1}`, Number(val)]);
        res.push({
            ...basicSettings,
            title: 'Validation accuracy',
            data,
        });
    }
    if (taskResults.valLoss) {
        const data = taskResults.valLoss.map((val, index) => [`Epoch ${index + 1}`, Number(val)]);
        res.push({
            ...basicSettings,
            title: 'Validation loss',
            data,
        });
    }
    return res;
}

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
        const graphics = getGraphicsData({ loss, accuracy, valLoss, valAccuracy });
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
            metrics = Object.assign({}, metrics, { valAccuracy: accuracyProcess(last(valAccuracy)) });
        }
        const nextData = Object.assign({}, state.data, { metrics, status, graphics });
        return {
            ...state,
            data: nextData,
        };
    },

    [CLEAN_LEARNING_TASK]: () => LearningTaskInitialState,

}, LearningTaskInitialState);

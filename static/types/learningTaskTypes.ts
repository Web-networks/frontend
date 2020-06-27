import { StateFieldT } from 'types/utilityTypes';

export interface MetricsT {
    loss: string | number;
    accuracy: string | number;
    valLoss: string | number;
    valAccuracy: string | number;
}

export enum LearningTasksStatuses {
    NOT_INITIALIZED = 'NOT INITIALIZED',
    FAILED = 'FAILED',
    INITIAL = 'INITIAL',
    WAITING = 'WAITING',
    SUCCEEDED = 'SUCCEEDED'
}

export interface LearningTaskT {
    id: string;
    metrics: MetricsT | null;
    graphics: any[];
    status: LearningTasksStatuses;
}

export interface LearningTaskStateT extends StateFieldT {
    data: LearningTaskT | null;
}

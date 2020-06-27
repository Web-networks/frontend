import React from 'react';
import { connect } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import classnames from 'classnames';
import { ApplicationStateT } from 'types';
import { LearningTaskT, LearningTasksStatuses } from 'types/learningTaskTypes';

import css from './TaskStatus.module.css';

interface TaskStatusConnectProps {
    currentTask: LearningTaskT | null;
    pending: boolean;
}

interface TaskStatusDispatchProps {
}

interface TaskStatusOwnProps {
    renderNotInitialStatus?: boolean;
}

type TaskStatusProps = TaskStatusConnectProps & TaskStatusDispatchProps & TaskStatusOwnProps;


function TaskStatusComponent(props: TaskStatusProps) {
    const { currentTask, pending, renderNotInitialStatus } = props;
    if (pending) {
        return (
            <Spinner animation='border' variant='info' />
        );
    }
    if (!currentTask && !renderNotInitialStatus) {
        return null;
    }
    const status = currentTask?.status || LearningTasksStatuses.NOT_INITIALIZED;
    return (
        <div className={classnames(css.root, {
            [css.success]: status === LearningTasksStatuses.SUCCEEDED,
            [css.waiting]: status === LearningTasksStatuses.WAITING,
            [css.failed]: status === LearningTasksStatuses.FAILED,
            [css.initialized]: status === LearningTasksStatuses.INITIAL,
            [css.notInitialized]: status === LearningTasksStatuses.NOT_INITIALIZED,
        })}>{status}</div>
    );
}

export const TaskStatus = connect<TaskStatusConnectProps, TaskStatusDispatchProps, TaskStatusOwnProps>(
    ({ learningTask }: ApplicationStateT) => ({
        currentTask: learningTask?.data,
        pending: learningTask.pending,
    }),
)(TaskStatusComponent);

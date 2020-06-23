import React from 'react';
import { connect } from 'react-redux';
import { ApplicationStateT } from 'types';
import { MetricsT } from 'types/learningTaskTypes';
import { TaskStatus } from 'containers/ProjectArea/TaskStatus/TaskStatus';
import { modelFetch } from 'actions/modelActions';
import { withPendingState } from 'hocs/withPendingState';

import css from './LearningResults.module.css';

interface LearningResultsConnectProps {
    metrics?: MetricsT | null;
    projectId: string;
}

interface LearningResultsDispatchProps {
    fetchModel: (projectId: string) => void;
}

interface LearningResultsOwnProps {
}

type LearningResultsProps = LearningResultsConnectProps & LearningResultsDispatchProps & LearningResultsOwnProps;

function LearningResultsComponent(props: LearningResultsProps) {
    const { metrics, projectId, fetchModel } = props;
    React.useEffect(() => {
        fetchModel(projectId);
    }, [projectId]);
    return (
        <div className={css.root}>
            <div className={css.table}>
                <div className={css.description}>{'TASK STATUS'}</div>
                <TaskStatus renderNotInitialStatus />
                {metrics?.accuracy &&
                    <>
                        <div className={css.description}>{'ACCURACY'}</div>
                        <div className={css.numbers}>{`${metrics.accuracy}%`}</div>
                    </>
                }
                {metrics?.loss &&
                    <>
                        <div className={css.description}>{'LOSS'}</div>
                        <div className={css.numbers}>{metrics.loss}</div>
                    </>
                }
                {metrics?.valAccuracy &&
                    <>
                        <div className={css.description}>{'VAL ACCURACY'}</div>
                        <div className={css.numbers}>{`${metrics.valAccuracy}%`}</div>
                    </>
                }
                {metrics?.valLoss &&
                    <>
                        <div className={css.description}>{'VAL LOSS'}</div>
                        <div className={css.numbers}>{metrics.valLoss}</div>
                    </>
                }
            </div>
        </div>
    );
}

// eslint-disable-next-line max-len
export const LearningResults = connect<LearningResultsConnectProps, LearningResultsDispatchProps, LearningResultsOwnProps>(
    ({ learningTask, currentProject }: ApplicationStateT) => ({
        metrics: learningTask.data?.metrics,
        projectId: currentProject.data!.id,
    }),
    dispatch => ({
        fetchModel: projectId => dispatch(modelFetch.emitRequest({ project: projectId })),
    }),
)(withPendingState(LearningResultsComponent, 'model'));

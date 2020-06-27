import React from 'react';
import { connect } from 'react-redux';
import { ApplicationStateT } from 'types';
import { MetricsT } from 'types/learningTaskTypes';
import { TaskStatus } from 'containers/ProjectArea/TaskStatus/TaskStatus';
import { modelFetch } from 'actions/modelActions';
import { withPendingState } from 'hocs/withPendingState';
// @ts-ignore TODO: solve how to typed this lib
import AnyChart from 'anychart-react';

import css from './LearningResults.module.css';

interface LearningResultsConnectProps {
    metrics?: MetricsT | null;
    projectId: string;
    graphics?: any[];
}

interface LearningResultsDispatchProps {
    fetchModel: (projectId: string) => void;
}

interface LearningResultsOwnProps {
}

type LearningResultsProps = LearningResultsConnectProps & LearningResultsDispatchProps & LearningResultsOwnProps;

function LearningResultsComponent(props: LearningResultsProps) {
    const { metrics, projectId, fetchModel, graphics } = props;
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
            <div className={css.graphics}>
                {graphics && graphics.map((graphSetting, index) =>
                    <div key={String(index)}>
                        <AnyChart
                            id={String(index)}
                            type="line"
                            width={500}
                            height={300}
                            {...graphSetting}
                        />
                    </div>,
                )}
            </div>
        </div>
    );
}

// eslint-disable-next-line max-len
export const LearningResults = connect<LearningResultsConnectProps, LearningResultsDispatchProps, LearningResultsOwnProps>(
    ({ learningTask, currentProject }: ApplicationStateT) => ({
        metrics: learningTask.data?.metrics,
        projectId: currentProject.data!.id,
        graphics: learningTask.data?.graphics,
    }),
    dispatch => ({
        fetchModel: projectId => dispatch(modelFetch.emitRequest({ project: projectId })),
    }),
)(withPendingState(LearningResultsComponent, 'model'));

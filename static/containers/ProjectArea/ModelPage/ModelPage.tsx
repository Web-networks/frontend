import React from 'react';
import { Image, Button } from 'react-bootstrap';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { ApplicationStateT } from 'types';
import { ModelT } from 'types/modelTypes';
import { modelFetch } from 'actions/modelActions';
import { ModelCreationForm } from 'containers/ProjectArea/ModelCreationForm/ModelCreationForm';
import { ModelEditingPage } from 'containers/ProjectArea/ModelEditingPage/ModelEditingPage';

import ModelImage from './icons/model.svg';

import css from './ModelPage.module.css';

interface ModelPageConnectProps {
    isPending: boolean;
    modelData: ModelT | null;
    projectId?: string;
}

interface ModelPageDispatchProps {
    fetchModel: (projectId: string) => void;
}

interface ModelPageOwnProps {
}

type ModelPageProps = ModelPageConnectProps & ModelPageDispatchProps & ModelPageOwnProps;

function ModelPageComponent(props: ModelPageProps): React.ReactElement {
    const { modelData, projectId, fetchModel } = props;
    React.useEffect(() => {
        if (projectId) {
            fetchModel(projectId);
        }
    }, [projectId]);
    const [showModelCreationForm, toogleModelCreationForm] = React.useState<boolean>(false);
    const closeModelCreationForm = React.useCallback(() => toogleModelCreationForm(false), [toogleModelCreationForm]);
    const openModelCreationForm = React.useCallback(() => toogleModelCreationForm(true), [toogleModelCreationForm]);
    const isEmptyPage = !modelData;
    return (
        <div className={classnames(css.root, { [css.withModelData]: !isEmptyPage })}>
            { isEmptyPage ?
                <EmptyModelPageComponent
                    openModelCreationForm={openModelCreationForm}
                />
                : <ModelEditingPage/>
            }
            <ModelCreationForm
                opened={showModelCreationForm}
                closeForm={closeModelCreationForm}
            />
        </div>
    );
}

interface EmptyModelPageComponentProps {
    openModelCreationForm: () => void;
}

function EmptyModelPageComponent(props: EmptyModelPageComponentProps) {
    const { openModelCreationForm } = props;
    return (
        <>
            <Image src={ModelImage} width={80} height={80} className={css.modelImage} />
            <Button
                variant='success'
                onClick={openModelCreationForm}
            >{'Create model'}</Button>
        </>
    );
}

export const ModelPage = connect<ModelPageConnectProps, ModelPageDispatchProps, ModelPageOwnProps>(
    ({ model, currentProject }: ApplicationStateT) => ({
        isPending: model.pending,
        modelData: model.data,
        projectId: currentProject.data?.id,
    }),
    dispatch => ({
        fetchModel: projectId => dispatch(modelFetch.emitRequest({ project: projectId })),
    }),
)(ModelPageComponent);

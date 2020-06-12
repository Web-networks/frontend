import React from 'react';
import { Image, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { ApplicationStateT } from 'types';
import { ModelT } from 'types/modelTypes';
import { ModelCreationForm } from 'containers/ProjectArea/ModelCreationForm/ModelCreationForm';

import ModelImage from './icons/model.svg';

import css from './ModelPage.module.css';

interface ModelPageConnectProps {
    isPending: boolean;
    modelData: ModelT | null;
}

interface ModelPageDispatchProps {
}

interface ModelPageOwnProps {
}

type ModelPageProps = ModelPageConnectProps & ModelPageDispatchProps & ModelPageOwnProps;

function ModelPageComponent(props: ModelPageProps): React.ReactElement {
    const { modelData } = props;
    const [showModelCreationForm, toogleModelCreationForm] = React.useState<boolean>(false);
    const closeModelCreationForm = React.useCallback(() => toogleModelCreationForm(false), [toogleModelCreationForm]);
    const openModelCreationForm = React.useCallback(() => toogleModelCreationForm(true), [toogleModelCreationForm]);
    return (
        <div className={css.root}>
            { modelData ?
                null :
                <>
                    <Image src={ModelImage} width={80} height={80} className={css.modelImage} />
                    <Button
                        variant='success'
                        onClick={openModelCreationForm}
                    >{'Create model'}</Button>
                </>
            }
            <ModelCreationForm
                opened={showModelCreationForm}
                closeForm={closeModelCreationForm}
                submitUrl={'/restapi/model/create'}
                stateField={'model'}
            />
        </div>
    );
}

export const ModelPage = connect<ModelPageConnectProps, ModelPageDispatchProps, ModelPageOwnProps>(
    ({ model }: ApplicationStateT) => ({
        isPending: model.pending,
        modelData: model.data,
    }),
)(ModelPageComponent);

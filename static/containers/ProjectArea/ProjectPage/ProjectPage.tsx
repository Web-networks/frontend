import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Image } from 'react-bootstrap';
import { ApplicationStateT } from 'types';
import { CurrentProjectDataT } from 'types/currentProjectTypes';
import { withRouter, match, Link, Route, Switch } from 'react-router-dom';
import { currentProjectFetch, cleanProject } from 'actions/currentProjectActions';
import { cleanLayers } from 'actions/layersActions';
import { cleanModel } from 'actions/modelActions';
import { Menu } from 'containers/ProjectArea/Menu/Menu';
import { ProjectInfo } from 'components/Project/ProjectInfo/ProjectInfo';
import { ProjectEditForm } from 'containers/ProjectArea/ProjectEditForm/ProjectEditForm';
import { makeProjectUrl } from 'lib/url';
import { ModelPage } from 'containers/ProjectArea/ModelPage/ModelPage';
import { DataPage } from 'containers/ProjectArea/DataPage/DataPage';
import { LearningResults } from 'containers/ProjectArea/LearningResults/LearningResults';
import { withPendingState } from 'hocs/withPendingState';

import LogoImg from '@assets/logo.png';
import BrainImg from './icons/neuro.svg';
import DefaultUserPhoto from '@assets/user.webp';
import AnalyticsSvg from './icons/analytics.svg';

import css from './ProjectPage.module.css';

interface ProjectPageConnectProps {
    currentProjectInfo: CurrentProjectDataT;
    isPending: boolean;
    error: string | null;
    userAvatar?: string | null;
    username?: string;
}

interface ProjectPageDispatchProps {
    fetchCurrentProject: (project: string, user: string) => void;
    onProjectPageUnmount: () => void;
}

interface ProjectPageOwnProps {
}

interface RouteParams {
    user: string;
    project: string;
}

interface ProjectPageInjectedProps {
    match: match<RouteParams>;
}

type ProjectPageProps = ProjectPageConnectProps
& ProjectPageDispatchProps
& ProjectPageOwnProps
& ProjectPageInjectedProps;

function ProjectPageComponent(props: ProjectPageProps) {
    const { fetchCurrentProject, match, currentProjectInfo, userAvatar, username, onProjectPageUnmount } = props;
    const { project, user: projectOwner } = match.params;
    React.useEffect(() => {
        if (projectOwner) {
            fetchCurrentProject(project, projectOwner);
        }
    }, [projectOwner]);
    React.useEffect(() => onProjectPageUnmount, []);
    if (!currentProjectInfo || !username) {
        return null;
    }
    const { id } = currentProjectInfo;
    const userImg = userAvatar || DefaultUserPhoto;
    const projectPageUrl = makeProjectUrl(projectOwner, project);
    const projectEditPageUrl = `${projectPageUrl}/edit`;
    const projectModelPageUrl = `${projectPageUrl}/model`;
    const projectTrainigPageUrl = `${projectPageUrl}/training`;
    const projectDataPageUrl = `${projectPageUrl}/data`;
    const submitUrl = `/restapi/projects/${id}/edit`;
    return (
        <div className={css.root}>
            <div className={css.header}>
                <Link to={`/${username}/projects/`} className={css.logo}>
                    <Image src={LogoImg} width={60}/>
                    <div className={css.logoName}>{'Neuro IDE'}</div>
                </Link>
                <div className={css.projectName}>
                    <Image src={BrainImg} width={60}/>
                    <div className={css.projectNameText}>{currentProjectInfo.displayName}</div>
                </div>
                <Image src={userImg} width={60} height={60} className={css.userAvatar} roundedCircle/>
            </div>
            <div className={css.body}>
                <div className={css.menu}>
                    <Image src={AnalyticsSvg} width={100} className={css.menuIcon}/>
                    <Menu projectOwner={projectOwner} projectName={project}/>
                </div>
                <div className={css.content}>
                    <Switch>
                        <Route exact path={projectEditPageUrl}>
                            <ProjectEditForm
                                submitUrl={submitUrl}
                                stateField={'currentProject'}
                            />
                        </Route>
                        <Route exact path={projectPageUrl}>
                            <ProjectInfo
                                projectInfo={currentProjectInfo}
                                projectEditPageUrl={projectEditPageUrl}
                            />
                        </Route>
                        <Route exact path={projectModelPageUrl}>
                            <ModelPage/>
                        </Route>
                        <Route exact path={projectTrainigPageUrl}>
                            <LearningResults/>
                        </Route>
                        <Route exact path={projectDataPageUrl}>
                            <DataPage/>
                        </Route>
                    </Switch>
                </div>
            </div>
        </div>
    );
}

export const ProjectPage = withRouter(connect<ProjectPageConnectProps, ProjectPageDispatchProps, ProjectPageOwnProps>(
    ({ currentProject, user }: ApplicationStateT) => ({
        currentProjectInfo: currentProject.data,
        isPending: currentProject.pending,
        error: currentProject.error,
        userAvatar: user.data?.avatar,
        username: user.data?.username,
    }),
    (dispatch: Dispatch) => ({
        fetchCurrentProject: (project, user) => dispatch(currentProjectFetch.emitRequest({ project, user })),
        onProjectPageUnmount: () => {
            dispatch(cleanLayers());
            dispatch(cleanModel());
            dispatch(cleanProject());
        },
    }),
)(withPendingState(ProjectPageComponent, 'currentProject')));

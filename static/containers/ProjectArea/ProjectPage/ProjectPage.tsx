import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Image } from 'react-bootstrap';
import { ApplicationStateT } from 'types';
import { CurrentProjectDataT } from 'types/currentProjectTypes';
import { withRouter, match, Link, Route, Switch } from 'react-router-dom';
import { currentProjectFetch } from 'actions/currentProjectActions';
import { Menu } from 'containers/ProjectArea/Menu/Menu';
import { ProjectInfo } from 'components/Project/ProjectInfo/ProjectInfo';
import { ProjectEditForm } from 'containers/ProjectArea/ProjectEditForm/ProjectEditForm';
import { makeProjectUrl } from 'lib/url';

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
}

interface ProjectPageDispatchProps {
    fetchCurrentProject: (project: string, user: string) => void;
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
    const { fetchCurrentProject, match, currentProjectInfo, userAvatar } = props;
    const { project, user } = match.params;
    React.useEffect(() => {
        fetchCurrentProject(project, user);
    }, []);
    if (!currentProjectInfo) {
        return null;
    }
    const userImg = userAvatar || DefaultUserPhoto;
    const projectPageUrl = makeProjectUrl(user, project);
    const projectEditPageUrl = `${projectPageUrl}/edit`;
    const submitUrl = `/restapi/projects/${project}/edit`;
    return (
        <div className={css.root}>
            <div className={css.header}>
                <Link to={`/${user}/projects/`} className={css.logo}>
                    <Image src={LogoImg} width={60}/>
                    <div className={css.logoName}>{'Neuro IDE'}</div>
                </Link>
                <div className={css.projectName}>
                    <Image src={BrainImg} width={60}/>
                    <div className={css.projectNameText}>{currentProjectInfo.displayName}</div>
                </div>
                <Image src={userImg} width={60} className={css.userAvatar} roundedCircle/>
            </div>
            <div className={css.body}>
                <div className={css.menu}>
                    <Image src={AnalyticsSvg} width={100} className={css.menuIcon}/>
                    <Menu projectOwner={user} projectName={project}/>
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
                            <ProjectInfo projectInfo={currentProjectInfo} projectEditPageUrl={projectEditPageUrl}/>
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
    }),
    (dispatch: Dispatch) => ({
        fetchCurrentProject: (project, user) => dispatch(currentProjectFetch.emitRequest({ project, user })),
    }),
)(ProjectPageComponent));

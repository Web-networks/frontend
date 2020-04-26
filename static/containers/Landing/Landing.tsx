import React from 'react';
import { connect } from 'react-redux';
import { ApplicationStateT } from 'types';
import StartNewProjectImg from '@assets/StartNewProject.png';
import ImageDescription1 from '@assets/dataScience1.png';
import ImageDescription2 from '@assets/dataScience2.jpg';
import ImageDescription3 from '@assets/dataScience3.jpg';
import ImageDescription4 from '@assets/dataScience4.jpeg';
import { UserDataT } from 'types/userTypes';
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import css from './Landing.module.css';

interface LandingConnectProps {
    userInfo: UserDataT;
}

interface LandingDispatchProps {
}

interface LandingOwnProps {
}

type LandingProps = LandingConnectProps & LandingDispatchProps & LandingOwnProps;

function LandingComponent(props: LandingProps): React.ReactElement {
    const { userInfo } = props;
    const startProjectUrl = userInfo ? `/${userInfo.username}/projects/` : '/entrance/signin';
    return (
        <div className={css.root}>
            <div className={css.header}>
                <h1>{'NEURO IDE'}</h1>
                <h2>{'The best visual ML editor for your models'}</h2>
                <Link to={startProjectUrl} className={css.startNewProjectButton}>
                    <Image src={StartNewProjectImg} rounded width={70}/>
                    <div className={css.buttonText}>{'START'}</div>
                </Link>
            </div>
            <div className={css.description}>
                <div>
                    <Image src={ImageDescription1}/>
                    <div>{'Create your own deep learning or ML models without coding'}</div>
                </div>
                <div>
                    <Image src={ImageDescription2}/>
                    <div>{'Work together in teams'}</div>
                </div>
                <div>
                    <Image src={ImageDescription3}/>
                    <div>{'Use your own data for fitting models'}</div>
                </div>
                <div>
                    <Image src={ImageDescription4}/>
                    <div>{'Share your models with world'}</div>
                </div>
            </div>
        </div>
    );
}

export const Landing = connect<LandingConnectProps, LandingDispatchProps, LandingOwnProps>(
    ({ user: { data: userInfo } }: ApplicationStateT) => ({
        userInfo,
    }),
)(LandingComponent);

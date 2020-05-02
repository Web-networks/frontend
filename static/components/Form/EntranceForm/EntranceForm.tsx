import React from 'react';
import { Image } from 'react-bootstrap';
import LogoImg from '@assets/logo.png';
import { Switch, Route } from 'react-router';
import { UserSignUpForm } from 'containers/User/UserSignUpForm/UserSignUpForm';
import { UserSignInForm } from 'containers/User/UserSignInForm/UserSignInForm';
import { NavLink } from 'react-router-dom';
import ProjectImg from '@assets/project.png';
import EntranceImg from '@assets/entranceImage.jpg';

import css from './EntranceForm.module.css';

export function EntranceForm(): React.ReactElement {
    return (
        <div className={css.root}>
            <div className={css.form}>
                <div className={css.logo}>
                    <h1>{'Neuro IDE'}</h1>
                    <Image src={LogoImg} width={80}/>
                </div>
                <div className={css.links}>
                    <NavLink to={'/entrance/signin/'} activeClassName={css.activeLink}>{'Log in'}</NavLink>
                    <NavLink to={'/entrance/signup/'} activeClassName={css.activeLink}>{'Sign up'}</NavLink>
                </div>
                <div className={css.formContent}>
                    <Switch>
                        <Route path='/entrance/signin'>
                            <UserSignInForm
                                submitUrl='/passport/signin'
                                stateField='user'
                                formClassName={css.formUI}
                            />
                        </Route>
                        <Route path='/entrance/signup'>
                            <UserSignUpForm
                                submitUrl='/passport/signup'
                                stateField='user'
                                formClassName={css.formUI}
                            />
                        </Route>
                    </Switch>
                    <Image src={EntranceImg} className={css.entranceImg}/>
                </div>
            </div>
            <div className={css.description}>
                <div className={css.descriptionContent}>{'Log in to go to projects'}</div>
                <Image src={ProjectImg} width={200}/>
            </div>
        </div>
    );
}

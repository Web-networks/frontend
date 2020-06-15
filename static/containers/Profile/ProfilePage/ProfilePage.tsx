import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { Button, Image } from 'react-bootstrap';
import { connect } from 'react-redux';
import { ApplicationStateT } from 'types';
import { InfoElement } from 'components/Profile/InfoElement/InfoElement';
import { ProfileEditForm } from 'containers/Profile/ProfileEditForm/ProfileEditForm';
import { withPendingState } from 'hocs/withPendingState';

import EditInfo from './icons/edit_profile.svg';

import css from './ProfilePage.module.css';

interface ProfilePageProps {
    firstName?: string | null;
    lastName?: string | null;
    username?: string;
    email?: string;
}

function ProfilePageComponent(props: ProfilePageProps) {
    const { email, firstName, lastName, username } = props;
    const profilePageUrl = `/${username}/profile`;
    const profileEditPageUrl = `${profilePageUrl}/edit`;
    if (!username) {
        return null;
    }
    return (
        <div className={css.root}>
            <div className={css.header}>
                <Image className={css.editIcon} src={EditInfo} width={60} />
                <h2 style={{ margin: 0 }}>{'Profile page'}</h2>
            </div>
            <div className={css.content}>
                <Switch>
                    <Route path={profileEditPageUrl} >
                        <ProfileEditForm
                            submitUrl={'/passport/editinfo'}
                            stateField={'user'}
                            redirectSuccessUrl={profilePageUrl}
                            firstName={firstName}
                            lastName={lastName}
                        />
                    </Route>
                    <Route>
                        <>
                            <InfoElement name={'email'} value={email} />
                            <InfoElement
                                name={'First name'}
                                value={firstName}
                                title={'first name'}
                            />
                            <InfoElement
                                name={'Last name'}
                                value={lastName}
                                title={'last name'}
                            />
                            <Button
                                variant='primary'
                                className={css.editButton}
                                to={profileEditPageUrl}
                                as={Link}
                            >{'Edit'}</Button>
                        </>
                    </Route>
                </Switch>
            </div>
        </div>
    );
}

export const ProfilePage = connect(
    ({ user }: ApplicationStateT): ProfilePageProps => ({
        email: user.data?.email,
        username: user.data?.username,
        firstName: user.data?.firstName,
        lastName: user.data?.lastName,
    }),
)(withPendingState(ProfilePageComponent, 'user'));

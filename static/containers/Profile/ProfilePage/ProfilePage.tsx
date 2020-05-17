import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import css from './ProfilePage.module.css';
import { connect } from 'react-redux';
import { ApplicationStateT } from '../../../types';
import { InfoElement } from '../../../components/Profile/InfoElement/InfoElement';
import { ProfileEditForm } from '../ProfileEditForm/ProfileEditForm';

interface ProfilePageProps {
    email?: string;
    firstName?: string | null;
    lastName?: string | null;
}

function ProfilePageComponent(props: ProfilePageProps): React.ReactElement {
    const [isEditFormOpened, setIsEditFormOpened] = useState(false);
    const { email, firstName, lastName } = props;
    const onEditForm = React.useCallback(() => setIsEditFormOpened(true), [setIsEditFormOpened]);
    const _setIsEditFromOpened = React.useCallback(
        value => setIsEditFormOpened(value),
        [setIsEditFormOpened],
    );
    if (email) {
        return (
            <div className={css.root}>
                <div className={css.header}>
                    <h2 style={{ margin: 0 }}>{'Profile page'}</h2>
                </div>
                <div className={css.content}>
                    {!isEditFormOpened ?
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
                                onClick={onEditForm}
                                className={css.editButton}
                            >
                                {'Edit'}
                            </Button>
                        </>
                        :
                        <ProfileEditForm
                            submitUrl={'/passport/editinfo'}
                            stateField={'user'}
                            setIsEditFormOpened={_setIsEditFromOpened}
                            firstName={firstName}
                            lastName={lastName}
                        />
                    }
                </div>
            </div>
        );
    }
    return <Redirect to={'/entrance/signin'}/>;
}

export const ProfilePage = connect(
    ({ user }: ApplicationStateT): ProfilePageProps => ({
        email: user.data?.email,
        firstName: user.data?.firstName,
        lastName: user.data?.lastName,
    }),
)(ProfilePageComponent);

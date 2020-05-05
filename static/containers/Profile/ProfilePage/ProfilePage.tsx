import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
                    <h2>{'Profile page'}</h2>
                </div>
                <div className={css.content}>
                    {!isEditFormOpened ?
                        <>
                            <InfoElement name={'email'} value={email} />
                            <InfoElement name={'First name'} value={'Nikita'} />
                            <InfoElement
                                name={'Last name'}
                                value={'Pashmentov'}
                            />
                            {firstName && <h3>{firstName}</h3>}
                            {lastName && <h3>{lastName}</h3>}
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
                        />
                    }
                </div>
            </div>
        );
    }
    return (
        <div className={css.signInContainer}>
            <Link to="/entrance/signin">
                <Button variant="primary">{'Sign In'}</Button>
            </Link>
        </div>
    );
}

export const ProfilePage = connect(
    ({ user }: ApplicationStateT): ProfilePageProps => ({
        email: user.data?.email,
    }),
)(ProfilePageComponent);

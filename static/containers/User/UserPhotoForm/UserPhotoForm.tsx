import React from 'react';
import { Modal, Image, Button } from 'react-bootstrap';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { PhotoUploader } from 'components/Form/PhotoUploader/PhotoUploader';
import { FormUI } from 'components/Form/FormUI/FormUI';
import { UserT } from 'types/userTypes';

import css from './UserPhotoForm.module.css';

import UserDefaultImg from '@assets/user.webp';
import { userInfoUpdate } from 'actions/userActions';
import { ApplicationStateT } from 'types';

interface UserPhotoFormProps {
    visible: boolean;
    setVisibility: (param: boolean) => void;
    onUserProfileUpdate?: (userInfo: UserT) => void;
    avatar?: string | null;
}

function UserPhotoFormComponent(props: UserPhotoFormProps): React.ReactElement {
    const { visible, setVisibility, onUserProfileUpdate, avatar } = props;

    const closeForm = React.useCallback(() => setVisibility(false), [setVisibility]);
    const [userImage, setUserImage] = React.useState<string>(avatar || UserDefaultImg);
    const [file, setFile] = React.useState<File | null>(null);
    const [pending, setPending] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => setError(null), [visible]);

    const uploadImage = React.useCallback(async () => {
        if (!file) {
            return;
        }
        setPending(true);
        const formData = new FormData();
        formData.append('avatar', file);
        const response = await fetch('/passport/set_avatar', {
            method: 'POST',
            body: formData,
        });
        setPending(false);
        if (!response.ok) {
            setError('Error during upload image');
        } else {
            const body: UserT = await response.json();
            if (onUserProfileUpdate) {
                onUserProfileUpdate(body);
            }
            closeForm();
        }
    }, [file, closeForm, onUserProfileUpdate]);

    return (
        <Modal show={visible} onHide={closeForm}>
            <Modal.Header closeButton>
                <Modal.Title>{'Change profile photo'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormUI
                    pending={pending}
                    error={error}
                    className={css.formUI}
                >
                    <Image
                        className={css.imagePreview}
                        src={userImage}
                        roundedCircle
                    />
                </FormUI>
            </Modal.Body>
            <Modal.Footer>
                <PhotoUploader setImage={setUserImage} setFile={setFile} />
                <Button variant='success' onClick={uploadImage}>{'Save'}</Button>
                <Button variant='secondary' onClick={closeForm}>{'Cancel'}</Button>
            </Modal.Footer>
        </Modal>
    );
}

export const UserPhotoForm = connect(
    ({ user }: ApplicationStateT) => ({
        avatar: user.data?.avatar,
    }),
    (dispatch: Dispatch) => ({
        onUserProfileUpdate: (userInfo: UserT) => dispatch(userInfoUpdate(userInfo)),
    }),
)(UserPhotoFormComponent);

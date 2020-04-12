import React from 'react';
import { connect } from 'react-redux';
import { Image } from 'react-bootstrap';

import { ApplicationStateT } from 'types/ApplicationStateT';
import DefaultImage from '@assets/rocket.png';

import css from './UserImage.module.css';

interface UserImageConnectProps {
    avatar?: string | null;
}

interface UserImageOwnProps {
    className?: string;
    width?: string | number;
}

type UserImageProps = UserImageConnectProps & UserImageOwnProps;

function UserImageComponent(props: UserImageProps): React.ReactElement {
    const { avatar, width } = props;
    const imageSrc = avatar || DefaultImage;
    return (
        <div className={css.root}>
            <Image src={imageSrc} width={width} />
        </div>
    );
}

export const UserImage = connect<UserImageConnectProps, UserImageOwnProps>(
    ({ userInfo }: ApplicationStateT) => ({
        avatar: userInfo?.avatar,
    }),
)(UserImageComponent);

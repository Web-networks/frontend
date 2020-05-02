import React from 'react';
import { Image } from 'react-bootstrap';
import { UserCard } from 'containers/PageLayout/UserCard/UserCard';
import { Menu } from 'containers/PageLayout/Menu/Menu';
import LogoImg from '@assets/logo.png';

import css from './LeftPannel.module.css';

interface LeftPannelConnectProps {
}

interface LeftPannelDispatchProps {
}

interface LeftPannelOwnProps {
}

type LeftPannelProps = LeftPannelConnectProps & LeftPannelDispatchProps & LeftPannelOwnProps;

export function LeftPannel(): React.ReactElement {
    return (
        <div className={css.root}>
            <UserCard/>
            <Menu/>
            <div className={css.logo}>
                <Image src={LogoImg} width={80} />
            </div>
        </div>
    );
}

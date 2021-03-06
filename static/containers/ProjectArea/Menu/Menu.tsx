import React from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { Image } from 'react-bootstrap';
import InfoIcon from './icons/info.svg';
import NeuronIcon from './icons/neuron.svg';
import DataIcon from './icons/data.svg';
import ExitIcon from './icons/exit.png';
import GymIcon from './icons/gym.svg';

import css from './Menu.module.css';
import { NavLink } from 'react-router-dom';

interface MenuConnectProps {
}

interface MenuDispatchProps {
}

interface MenuOwnProps {
    className?: string;
    projectOwner: string;
    projectName: string;
}

type MenuProps = MenuConnectProps & MenuDispatchProps & MenuOwnProps;

interface MenuItem {
    to: string;
    icon: string;
    displayName: string;
}

function MenuComponent(props: MenuProps): React.ReactElement {
    const { className, projectOwner, projectName } = props;
    const MenuItems: MenuItem[] = [{
        displayName: 'PROJECT INFO',
        to: `/${projectOwner}/${projectName}/`,
        icon: InfoIcon,
    }, {
        displayName: 'MODEL PROTOTYPE',
        to: `/${projectOwner}/${projectName}/model/`,
        icon: NeuronIcon,
    }, {
        displayName: 'TRAINING RESULTS',
        to: `/${projectOwner}/${projectName}/training`,
        icon: GymIcon,
    }, {
        displayName: 'DATA',
        to: `/${projectOwner}/${projectName}/data`,
        icon: DataIcon,
    }, {
        displayName: 'RETURN TO PROJECTS',
        to: `/${projectOwner}/projects/`,
        icon: ExitIcon,
    }];
    return (
        <div className={classnames(css.root, className)}>
            {MenuItems.map(menuItem =>
                <NavLink
                    exact
                    key={menuItem.displayName}
                    to={menuItem.to}
                    activeClassName={css.activeMenuItem}
                    className={css.menuItem}
                >
                    <Image src={menuItem.icon} width={30}/>
                    <div className={css.menuItemText}>{menuItem.displayName}</div>
                </NavLink>,
            )}
        </div>
    );
}

export const Menu = connect<MenuConnectProps, MenuDispatchProps, MenuOwnProps>(
    null,
    null,
    null,
    { pure: false },
)(MenuComponent);

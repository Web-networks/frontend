import React from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { ApplicationStateT } from 'types';
import { Image } from 'react-bootstrap';
import { UserDataT } from 'types/userTypes';

import ProjectsIcon from './icons/project.png';
import ProfileIcon from './icons/user.png';
import ChangeUserIcon from './icons/change_user.png';
import ExitIcon from './icons/exit.png';
import css from './Menu.module.css';

interface MenuConnectProps {
    userInfo: UserDataT;
}

interface MenuDispatchProps {
}

interface MenuOwnProps {
}

interface MenuInjectedProps {
    location: any;
}

type MenuProps = MenuConnectProps & MenuDispatchProps & MenuOwnProps & MenuInjectedProps;

interface MenuItemT {
    label: string;
    icon: string;
    to: string;
}

type MenuItemsT = Array<MenuItemT>;

function MenuComponent(props: MenuProps) {
    const { userInfo, location: _ } = props;
    if (!userInfo) {
        return null;
    }
    const { username } = userInfo;
    const MenuItems: MenuItemsT = [{
        label: 'Projects',
        icon: ProjectsIcon,
        to: `/${username}/projects/`,
    }, {
        label: 'Profile',
        icon: ProfileIcon,
        to: `/${username}/profile/`,
    }, {
        label: 'Change user',
        icon: ChangeUserIcon,
        to: '/entrance/signin',
    }, {
        label: 'Exit',
        icon: ExitIcon,
        to: '/signout',
    }];
    return (
        <div className={css.root}>
            {MenuItems.map(({ label, icon, to }) =>
                <NavLink
                    key={name}
                    to={to}
                    className={css.menuItem}
                    activeClassName={css.activeMenuItem}
                >
                    <Image src={icon} width={30}/>
                    <div>{label}</div>
                </NavLink>,
            )}
        </div>
    );
}

export const Menu = withRouter(connect<MenuConnectProps, MenuDispatchProps, MenuOwnProps>(
    ({ user }: ApplicationStateT) => ({
        userInfo: user.data,
    }), { pure: false },
)(MenuComponent));

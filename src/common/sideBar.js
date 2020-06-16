import React from 'react';
import { Menu } from 'antd';
import { NavLink } from 'react-router-dom';

const { SubMenu } = Menu;

export default function ({ menu }) {
    return <div className="menu">
        <Menu mode="inline">
            {
                menu.map(item => {
                    if (!item.childer) {
                        return <Menu.Item key={item.href} icon={item.icon ? item.icon : null}>
                            <NavLink to={item.href}>{item.title}</NavLink>
                        </Menu.Item>
                    }
                })
            }
        </Menu>
    </div>
}
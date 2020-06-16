import React, { useState, useEffect } from 'react';
import { renderRoutes } from 'react-router-config';
import { NavLink } from 'react-router-dom';
import { Layout } from 'antd';

import { getItem } from './../../tools/baseTool';

import style from './index.module.less';
import Timer from './../../common/timer';

const { Header, Content } = Layout;


const Index = (prpos) => {
    const baseMenu = [{ href: '/frame/info', title: '详情', icon: 'icon-xiangqing' }, { href: '/frame/report', title: '推送', icon: 'icon-xiangqing1' }, { href: '/frame/rank', title: '排行', icon: 'icon-paihang' }, { href: '/frame/setting', title: '设置', icon: 'icon-shezhi' }, { href: '/frame/user', title: '我的', icon: 'icon-wode' }];

    const [menu, setMenu] = useState([]);
    const [title, setTitle] = useState('');

    useEffect(() => {
        const loginInfo = getItem('loginInfo');
        if (!loginInfo) { prpos.history.push('/login'); return }
        const { data = {} } = loginInfo;
        if (loginInfo.type === 'branch') {
            baseMenu.splice(0, 0, { href: '/frame/branchBI', title: '首页', icon: 'icon-shouye' });
            const { branch: { name } } = data;
            setTitle(name);
        }
        if (loginInfo.type === 'dep') {
            baseMenu.splice(0, 0, { href: '/frame/depBI', title: '首页', icon: 'icon-shouye' });
            const { dep: { departmentName } } = data;
            setTitle(departmentName);
        }
        if (loginInfo.type === 'pro') {
            baseMenu.splice(0, 0, { href: '/frame/proBI', title: '首页', icon: 'icon-shouye' });
            const { pro: { xmidName } } = data;
            setTitle(xmidName);
        }
        setMenu(baseMenu);
    }, []);

    return (
        <Layout style={{ height: '100%' }} className={style.container}>
            <Header className={style.header}>
                <span className={style.headerLeft} onClick={() => { prpos.history.push('/login') }}>
                    塔吊在线管理平台
                    </span>
                <span className={style.headerCenter}>{title}</span>
                <div className={style.headerMenu}>
                    {
                        menu.map((item, index) => {
                            return <NavLink to={item.href} key={index}>
                                <i className={["iconfont", item.icon].join(' ')}></i>
                                &nbsp;
                                {item.title}
                            </NavLink>
                        })
                    }
                </div>
                <Timer />
            </Header>
            <Content>
                {
                    renderRoutes(prpos.route.routes)
                }
            </Content>
        </Layout>
    )
}

export default Index;
import React, { useEffect } from 'react';
import { Layout } from 'antd';
import { renderRoutes } from 'react-router-config';

import SideBar from './../../common/sideBar';
import bg from './../../imgs/temp/s_info.png';

const { Sider, Content } = Layout;
const menu = [{
    href: '/frame/info/baseInfo',
    title: '基本信息',
    icon: null
}, {
    href: '/frame/info/loadLedger',
    title: '吊重统计',
    icon: null
}, {
    href: '/frame/info/no/2',
    title: '安拆计划',
    icon: null
}, {
    href: '/frame/info/no/3',
    title: '使用期限',
    icon: null
}, {
    href: '/frame/info/no/4',
    title: '报警分布',
    icon: null
}, {
    href: '/frame/info/no/5',
    title: '异常警报',
    icon: null
}, {
    href: '/frame/info/no/6',
    title: '塔吊效率',
    icon: null
}, {
    href: '/frame/info/no/7',
    title: '消息列表',
    icon: null
}];

export default function (prpos) {
    useEffect(() => {
        if (prpos.location.pathname === '/frame/info') {
            prpos.history.push('/frame/info/loadLedger');
        }
    }, [])
    return <Layout className="container">
        <Sider>
            <SideBar menu={menu} />
        </Sider>
        <Content>
            {
                renderRoutes(prpos.route.routes)
            }
        </Content>
    </Layout>;
}

// import React from 'react';

// import bg from './../../imgs/temp/s_info.png';
// export default function () {
//     return <div className="container" style={{ overflow: 'auto', height: '100%' }}>
//         <img src={bg} width="100%" alt="排行榜" />
//     </div>;
// }
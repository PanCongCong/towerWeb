import asyncComponent from './../common/AsyncComponent';

const routerConfig = [
    {
        path: '/login',
        component: asyncComponent(() => import('./../components/login/index'))
    },
    {
        path: '/demo',
        component: asyncComponent(() => import('./../components/demo/index'))
    },
    {
        path: '/frame',
        Auth: true,
        component: asyncComponent(() => import('./../components/frame/index')),
        routes: [{
            path: '/frame/branchBI',
            component: asyncComponent(() => import('./../components/bi/branchBI/index'))
        }, {
            path: '/frame/depBI',
            component: asyncComponent(() => import('./../components/bi/depBI/index'))
        }, {
            path: '/frame/proBI',
            component: asyncComponent(() => import('./../components/bi/proBI/index'))
        }, {
            path: '/frame/info',
            component: asyncComponent(() => import('./../components/info/index')),
            routes: [{
                path: '/frame/info/baseInfo',
                component: asyncComponent(() => import('./../components/info/baseInfo/index')),
            },{
                path: '/frame/info/loadLedger',
                component: asyncComponent(() => import('./../components/info/loadLedger/index')),
            }, {
                path: '/frame/info/no/:id',
                component: asyncComponent(() => import('./../common/under')),
            }]
        }, {
            path: '/frame/report',
            component: asyncComponent(() => import('./../components/report/index'))
        }, {
            path: '/frame/rank',
            component: asyncComponent(() => import('./../components/rank/index'))
        }, {
            path: '/frame/setting',
            component: asyncComponent(() => import('./../components/setting/index'))
        }, {
            path: '/frame/user',
            component: asyncComponent(() => import('./../components/user/index'))
        }]
    },
    {
        path: '/',
        component: asyncComponent(() => import('./../components/login/index'))
    }
];
export default routerConfig;

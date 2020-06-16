import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.less';
import './style/reset.antd.less';
import * as serviceWorker from './serviceWorker';

import { HashRouter as Router } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import routers from './routers/index';

import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider } from 'antd';

import initAxios from './init/axios.init';
import { AppContextProvider } from './context';

initAxios();

ReactDOM.render(
  // <React.StrictMode>
  <AppContextProvider>
    <ConfigProvider locale={zhCN}>
      <Router>
        {
          renderRoutes(routers)
        }
      </Router>
    </ConfigProvider>
  </AppContextProvider>,
  // </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// 首页左三，有效运行时间
import React from 'react';

import style from './../index.module.less';

export default function () {

    return <div className={style.card}>
        <div className={style.cardTitle}>
            塔吊管理信息
        </div>
        <div className={[style.towerInfo].join(' ')}>
            <div className={style.row}>
                <div>租赁单位：</div>
                <div>中建三局南方公司</div>
            </div>
            <div className={style.row}>
                <div>安装单位：</div>
                <div>中建三局南方公司</div>
            </div>
            <div className={style.row}>
                <div>验收时间：</div>
                <div>2019年5月20日</div>
            </div>
            <div className={style.row}>
                <div>现场操作指挥：</div>
                <div>李霞</div>
            </div>
            <div className={style.row}>
                <div>安装人员：</div>
                <div>李霞</div>
            </div>
        </div>
    </div>
}
// 首页左三，有效运行时间
import React from 'react';

import style from './../index.module.less';

export default function () {

    return <div className={style.card}>
        <div className={style.cardTitle}>
            塔吊基本信息
        </div>
        <div className={[style.towerInfo].join(' ')}>
            <div className={style.row}>
                <div>型号：</div>
                <div>01015485</div>
            </div>
            <div className={style.row}>
                <div>使用年限：</div>
                <div>3年</div>
            </div>
            <div className={style.row}>
                <div>启用时间：</div>
                <div>2019年5月20日</div>
            </div>
            <div className={style.row}>
                <div>总包专业管理员：</div>
                <div>李霞</div>
            </div>
        </div>
    </div>
}
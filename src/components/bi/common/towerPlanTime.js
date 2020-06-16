// 首页左四
import React from 'react';
import { Progress } from 'antd';
import style from './../index.module.less';

export default function () {
    return <div className={[style.planTime, style.card].join(' ')}>
        <div className={style.cardTitle}>
            计划使用时间
        </div>
        <div className={style.info}>各设备已使用天数</div>
        <div className={style.sum}><span className={style.num}>342</span>天</div>
        <div>
            <div className={style.progress}>
                <span>占计划使用天数比例：</span>
                <Progress strokeColor="#9252E9" trailColor="#131B2F" percent={75} />
                <span className={style.num}>75%</span>
            </div>
            <div className={style.progress}>
                <span>距使用到期天数差距：</span>
                <Progress strokeColor="#FBB318" trailColor="#131B2F" percent={11} />
                <span className={style.num}>11%</span>
            </div>
        </div>
    </div>;
}
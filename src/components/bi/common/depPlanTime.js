// 首页左四
import React from 'react';
import style from './../index.module.less';

export default function () {
    return <div className={[style.planTime, style.card].join(' ')}>
        <div className={style.cardTitle}>
            计划使用时间
        </div>
        <div className={[style.cardContent, style.depWrap].join(' ')}>
            <div className={style.depChart}>
                <div className={style.info}>计划内占</div>
                <div className={style.sum}><span className={style.num}>121</span>台</div>
                <div>
                    <div className={style.row}>
                        <span>超三个月：</span>
                        <span className={[style.num, style.color1].join(' ')}>56台</span>
                    </div>
                    <div className={style.row}>
                        <span>费用：</span>
                        <span className={[style.num, style.color1].join(' ')}>18万</span>
                    </div>
                    <div className={style.row}>
                        <span>超六个月：</span>
                        <span className={[style.num, style.color2].join(' ')}>30台</span>
                    </div>
                    <div className={style.row}>
                        <span>费用：</span>
                        <span className={[style.num, style.color2].join(' ')}>41万</span>
                    </div>
                    <div className={style.row}>
                        <span>超&nbsp;&nbsp;一&nbsp;&nbsp;年：</span>
                        <span className={[style.num, style.color3].join(' ')}>6台</span>
                    </div>
                    <div className={style.row}>
                        <span>费用：</span>
                        <span className={[style.num, style.color3].join(' ')}>35万</span>
                    </div>
                </div>
            </div>
            <div className={style.depInfo}>
                <div className={style.depItem}>
                    <h5>广州经理部</h5>
                    <p>32423次</p>
                </div>
                <div className={style.depItem}>
                    <h5>厦门经理部</h5>
                    <p>1581次</p>
                </div>
                <div className={style.depItem}>
                    <h5>深圳经理部</h5>
                    <p>958次</p>
                </div>
            </div>
        </div>
    </div>;
}
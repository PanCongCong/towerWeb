import React, { useState } from 'react';

import style from './index.module.less';
import bg from './../../imgs/temp/s_report.png';

import NoDataBar from './common/noDataBar';
import NoDataPie from './common/noDataPie';
import OvertimeLine from './common/overtimeLine';
import OvertimeBar from './common/overtimebar';
import IdleBar from './common/idleBar';
import IdlePie from './common/idlePie';
import SafePie from './common/safePie';
import SafeText from './common/safeText';


export default function () {
    const [active, setActive] = useState(1);
    const getBtnStyle = (idx) => {
        if (idx === active) {
            return style.active;
        }
        return null
    }
    return <div className={["container", style.container].join(' ')}>
        <div className={style.top}>
            <div className={style.barGroup}>
                <div className={getBtnStyle(1)} key={1} onClick={() => { setActive(1) }}>日报</div>
                <div className={getBtnStyle(2)} key={2} onClick={() => { setActive(2) }}>周报</div>
                <div className={getBtnStyle(3)} key={3} onClick={() => { setActive(3) }}>月报</div>
            </div>
        </div>
        <div className={style.content}>
            <div className={style.row}>
                <div className={style.card}>
                    <div className={style.cardTit}>塔吊数据未上传情况</div>
                    <div className={style.cardContent}>
                        <div className={style.part}><NoDataBar /></div>
                        <div className={style.part}><NoDataPie /></div>
                    </div>
                </div>
                <div className={style.card}>
                    <div className={style.cardTit}>超期使用</div>
                    <div className={style.cardContent}>
                        <div className={style.part}><OvertimeLine /></div>
                        <div className={style.part}><OvertimeBar /></div>
                    </div>
                </div>
            </div>
            <div className={style.row}>
                <div className={style.card}>
                    <div className={style.cardTit}>塔吊闲置情况</div>
                    <div className={style.cardContent}>
                        <div className={style.part}><IdleBar /></div>
                        <div className={style.part}><IdlePie /></div>
                    </div>
                </div>
                <div className={style.card}>
                    <div className={style.cardTit}>安全限位预警</div>
                    <div className={style.cardContent}>
                        <div className={style.part}><SafePie /></div>
                        <div className={style.part}><SafeText /></div>
                    </div>
                </div>
            </div>

        </div>
    </div>;
}

// import React from 'react';

// import bg from './../../imgs/temp/s_report.png';
// export default function () {
//     return <div className="container" style={{ overflow: 'auto', height: '100%' }}>
//         <img src={bg} width="100%" alt="排行榜" />
//     </div>;
// }
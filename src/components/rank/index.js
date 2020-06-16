import React, { useState } from 'react';

import style from './index.module.less';

import TowerRank from './common/towerRank';
import CustomRank from './common/customRank';
import RankInfo from './common/rankInfo';

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
                    <div className={style.cardTit}>塔吊排行榜</div>
                    <div className={style.cardContent}>
                        <TowerRank />
                    </div>
                </div>
                <div className={[style.card, style.overallCard].join(' ')}>
                    <div className={style.cardTit}>整体排行榜</div>
                    <div className={style.cardContent}>
                        <CustomRank />
                    </div>
                </div>
            </div>
            <div className={style.row}>
                <div className={style.card}>
                    <div className={style.cardTit}>各经理部塔吊使用情况</div>
                    <div className={style.cardContent}>
                        <RankInfo />
                    </div>
                </div>
            </div>
        </div>
    </div>
}


// import bg from './../../imgs/temp/s_rank.png';
// export default function () {
//     return <div className="container" style={{ overflow: 'auto', height: '100%' }}>
//         <img src={bg} width="100%" alt="排行榜" />
//     </div>;
// }
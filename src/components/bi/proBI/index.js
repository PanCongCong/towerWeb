import React from 'react';

import style from './../index.module.less';

import Map from './../common/towerMap';

import TowerInfo from './../common/towerInfo';
import HangTime from './../common/hangTime';
import RunTime from './../common/runTime';
import PlanTime from './../common/towerPlanTime';

import TowerBase from './../common/towerBase';
import DepNum from './../common/proNum';
import DepRunTime from './../common/proRunTime';

export default function () {
    return <div className={style.container}>
        <div className={style.infoWrap}>
            <div className={style.title}>
                项目部
                <small>Project</small>
            </div>
            <TowerInfo />
            <HangTime />
            <RunTime />
            <PlanTime />
        </div>
        <div className={style.centerWrap}>
            <Map />
        </div>
        <div className={style.infoWrap}>
            <div className={style.title}>
                塔吊
                <small>Tower Crane</small>
            </div>
            <TowerBase />
            <DepNum />
            <DepRunTime />
            <PlanTime />
        </div>
    </div>;
}
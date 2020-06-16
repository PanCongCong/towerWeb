import React from 'react';

import style from './../index.module.less';

import Map from './../common/companyMap';

import Sum from './../common/sum';
import HangTime from './../common/hangTime';
import RunTime from './../common/runTime';
import PlanTime from './../common/planTime';

import DepSum from './../common/proSum';
import DepNum from './../common/proNum';
import DepRunTime from './../common/proRunTime';

export default function () {
    return <div className={style.container}>
        <div className={style.infoWrap}>
            <div className={style.title}>
                经理部
                <small>Intendance</small>
            </div>
            <Sum />
            <HangTime />
            <RunTime />
            <PlanTime />
        </div>
        <div className={style.centerWrap}>
            <Map />
        </div>
        <div className={style.infoWrap}>
            <div className={style.title}>
                项目部
                <small>Project</small>
            </div>
            <DepSum />
            <DepNum />
            <DepRunTime />
            <PlanTime />
        </div>
    </div>;
}
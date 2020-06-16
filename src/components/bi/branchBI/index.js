import React from 'react';

import style from './../index.module.less';

import Map from './../common/companyMap';

import Sum from './../common/sum';
import HangTime from './../common/hangTime';
import RunTime from './../common/runTime';
import PlanTime from './../common/planTime';

import DepSum from './../common/depSum';
import DepNum from './../common/depNum';
import DepRunTime from './../common/depRunTime';
import DepPlanTime from './../common/depPlanTime';

export default function () {
    return <div className={style.container}>
        <div className={style.infoWrap}>
            <div className={style.title}>
                公司
                <small>Corporation</small>
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
                经理部
                <small>Intendance</small>
            </div>
            <DepSum />
            <DepNum />
            <DepRunTime />
            <DepPlanTime />
        </div>
    </div>;
}
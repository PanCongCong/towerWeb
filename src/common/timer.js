import React, { useState, useEffect } from 'react';

import style from './../components/frame/index.module.less';

const weeks = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
const setZero = function (num) {
    if (typeof num !== 'string') {
        num = num.toString();
    }
    if (num.length < 2) {
        return '0' + num
    }
    return num;
}

const Index = (prpos) => {
    const [date, setDate] = useState();
    useEffect(() => {
        const timer = setInterval(() => {
            setDate(new Date());
        }, 1000);
        return () => { clearInterval(timer); }
    }, []);
    let hms = '', yyyyMMdd = '', week = '';
    if (date) {
        const d = new Date();
        hms = `${setZero(date.getHours())}:${setZero(date.getMinutes())}:${setZero(date.getSeconds())}`;
        yyyyMMdd = `${date.getFullYear()}\\${setZero(date.getMonth() + 1)}\\${setZero(date.getDate())}`;
        week = weeks[date.getDay()];
    }

    return (
        <div className={style.timeWrap}>
            <div className={style.time}>
                {hms}
            </div>
            <div className={style.date}>
                <div key='week'>
                    {week}
                </div>
                <div key='date'>
                    {yyyyMMdd}
                </div>
            </div>
        </div>
    )
}

export default Index;
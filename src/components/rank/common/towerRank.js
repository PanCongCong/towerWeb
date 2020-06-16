import React, { useState, useRef, useEffect } from 'react';
import echarts from 'echarts';
import style from './../index.module.less';

let echart = null;
export default function () {
    const chart = useRef(null);
    const [active, setActive] = useState(1);
    const getBtnStyle = (idx) => {
        if (idx === active) {
            return style.active;
        }
        return null
    }

    useEffect(() => {
        if (!chart.current) return;
        echart = echarts.init(chart.current);
    }, [])

    useEffect(() => {
        const xData = ['广州经理部', '深圳经理部', '昆明经理部'];
        const yData = Array(3).fill().map(item => Math.round(Math.random() * 100));
        const option = {
            grid: {
                show: false,
                left: 10,
                right: 5,
                top: 40,
                bottom: 20,
                containLabel: true
            },
            tooltip: {
                trigger: 'axis',
                formatter: '{b0}：<br/>{c0}%'
            },
            xAxis: {
                type: "category",
                axisLabel: {
                    interval: 0,
                    color: "#CECECE",
                    fontSize: 10
                },
                axisLine: {
                    lineStyle: {
                        color: "rgba(255, 255, 255, 0.15)"
                    }
                },
                nameTextStyle: {
                    color: "#CECECE"
                },
                show: true,
                data: xData
            },
            yAxis: [
                {
                    type: "value",
                    name: "%",
                    max: 100,
                    nameTextStyle: {
                        color: '#fff',
                        align: 'left'
                    },
                    axisLabel: {
                        color: "#CECECE"
                    },
                    axisLine: {
                        show: false
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: "rgba(255, 255, 255, 0.15)"
                        }
                    }
                }
            ],
            series: [
                {
                    type: "bar",
                    barMaxWidth: 20,
                    data: yData,
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [{
                                    offset: 0,
                                    color: 'rgba(37, 159, 254, 1)'
                                },
                                {
                                    offset: 1,
                                    color: 'rgba(189, 66, 157, 0)'
                                }
                                ]
                            )
                        }
                    }
                }
            ],
            animation: true
        };
        echart.setOption(option);
    }, [active])

    return <div className={style.part}>
        <div className={style.top}>
            <div className={style.barGroup}>
                <div className={getBtnStyle(1)} key={1} onClick={() => { setActive(1) }}>日报</div>
                <div className={getBtnStyle(2)} key={2} onClick={() => { setActive(2) }}>周报</div>
                <div className={getBtnStyle(3)} key={3} onClick={() => { setActive(3) }}>月报</div>
            </div>
        </div>
        <div className={style.chart} ref={chart}>

        </div>
    </div>
}
import React, { useRef, useEffect } from 'react';
import echarts from 'echarts';

import style from './../index.module.less';
export default function () {
    const dom = useRef();
    useEffect(() => {
        let echart = echarts.init(dom.current);
        const xData = ['广州经理部', '深圳经理部', '厦门经理部'];
        const yData = [65, 18, 35];
        const option = {
            grid: {
                show: false,
                left: 20,
                right: 20,
                top: 40,
                bottom: 20,
                containLabel: true
            },
            tooltip: {
                trigger: 'axis',
                formatter: '{b0}<br/>{c0}万元'
            },
            xAxis: {
                type: "category",
                axisLabel: {
                    color: "#CECECE"
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
                    name: "万元",
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
                    data: yData,
                    barMaxWidth: 20,
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
                                    color: 'rgba(167, 79, 241, 0.13)'
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
    }, [])
    return <>
        <div className={style.partTit}>超期使用金额</div>
        <div className={style.chart} ref={dom}></div>
        <div className={style.des}>各经理部有多少塔吊处于超期使用的状态以及因此发生的总金额（租赁费、人工费）</div>
    </>;
}
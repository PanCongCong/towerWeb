import React, { useRef, useEffect } from 'react';
import echarts from 'echarts';

import style from './../index.module.less';
export default function () {
    const dom = useRef();
    useEffect(() => {
        let echart = echarts.init(dom.current);
        const xData = ['广州经理部', '深圳经理部', '厦门经理部'];
        const yData = [5, 8, 12];
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
                formatter: '{b0}<br/>{c0}个'
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
                    name: "个",
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
                                    color: 'rgba(198, 67, 158, 1)'
                                },
                                {
                                    offset: 1,
                                    color: 'rgba(57, 46, 99, 0)'
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
        <div className={style.partTit}>闲置大于60%项目</div>
        <div className={style.chart} ref={dom}></div>
        <div className={style.des}>各项目部塔吊闲置时间大于60%的项目有多少，这种情况共出现了多少天</div>
    </>;
}
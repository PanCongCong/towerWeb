// 首页左三，有效运行时间
import React, { useEffect, useRef, useState } from 'react';
import echarts from 'echarts';
import axios from 'axios';
import { Spin } from 'antd';

import { getItem, mappingType, getParamId } from './../../../tools/baseTool';

import style from './../index.module.less';

let echart = null;
export default function () {
    const loginInfo = getItem('loginInfo');
    const { type } = loginInfo;

    const chart = useRef(null);
    const [selectItem, setSelect] = useState('2');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        echart = echarts.init(chart.current);
    }, [])
    useEffect(() => {
        if (!chart.current) return;
        setLoading(true);
        axios.post('appTower/queryHistoryTowerByTime', {
            status: mappingType[type], id: getParamId(), dayStatus: selectItem
        }).then(res => {
            const { data = [] } = res || {};
            const xData = data.map(item => item.days);
            const yData = data.map(item => item.time);
            const yData2 = data.map(item => item.kongTime);
            const fz = 3;
            const option = {
                legend: {
                    show: true,
                    right: 0,
                    top: 0,
                    textStyle: {
                        color: '#fff'
                    }
                },
                tooltip:{
                    trigger:'axis',
                    formatter:'{b0}<br/>{a0}{c0}分钟<br/>{a1}{c1}分钟'
                },
                grid: {
                    show: false,
                    left: 20,
                    right: 20,
                    top: 40,
                    bottom: 20,
                    containLabel: true
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
                        name: "分钟",
                        max: 60,
                        min: 0,
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
                        name: '使用',
                        data: yData,
                        barMaxWidth: 20,
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(
                                    0, 0, 0, 1,
                                    [{
                                        offset: 0,
                                        color: 'rgba(84, 234, 194, 1)'
                                    },
                                    {
                                        offset: 1,
                                        color: 'rgba(42, 127, 209, 0)'
                                    }
                                    ]
                                )
                            }
                        },
                        // markLine: {
                        //     symbol: '',
                        //     label: { show: false },
                        //     lineStyle: {
                        //         color: "#FBB318"
                        //     },
                        //     data: [{
                        //         yAxis: fz
                        //     }]
                        // }
                    },
                    {
                        type: "bar",
                        data: yData2,
                        name: '停载',
                        barMaxWidth: 20,
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(
                                    0, 0, 0, 1,
                                    [{
                                        offset: 0,
                                        color: 'rgba(146, 82, 233, 1)'
                                    },
                                    {
                                        offset: 1,
                                        color: 'rgba(132, 18, 18, 0.16)'
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
        }).finally(() => {
            setLoading(false);
        });
    }, [selectItem])

    return <div className={style.card}>
        <div className={style.cardTitle}>
            有效运行时间
            <div className={style.cardBtnGroup}>
                <span className={selectItem === '1' ? style.active : ''} onClick={() => setSelect('1')}>日</span>
                <span className={selectItem === '2' ? style.active : ''} onClick={() => setSelect('2')}>周</span>
                <span className={selectItem === '3' ? style.active : ''} onClick={() => setSelect('3')}>月</span>
            </div>
        </div>
        <div className={style.cardContent}>
            {
                loading ? <Spin className="loading-full" /> : null
            }
            <div ref={chart} style={{ height: '100%', width: '100%' }}></div>
        </div>
    </div>
}
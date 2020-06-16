// 首页右一
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
    const [resData, setResData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!chart.current) return;
        echart = echarts.init(chart.current);
        setLoading(true);
        axios.post('/appTower/queryTowerExceptionByDepart', {
            status: mappingType[type], id: getParamId()
        }).then(res => {
            const { data = [] } = res || {};
            setResData(data);
            const xData = data.map(item => item.name);
            const yData = data.map(item => item.runCount);
            const yData2 = data.map(item => item.exceCount);
            const fz = 3;
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
                    trigger: 'axis'
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
                        name: "台",
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
                        name: '正常',
                        maxBarWidth: 20,
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
                        name: '异常',
                        maxBarWidth: 20,
                        data: yData2,
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
        })
    }, [])

    return <div className={style.card}>
        <div className={style.cardTitle}>
            运行监测系统上线设备
        </div>
        <div className={[style.cardContent, style.depWrap].join(' ')}>
            <div ref={chart} className={style.depChart}></div>
            <div className={style.depInfo}>
                {
                    resData.map((item, index) => {
                        if (index > 2) return null;
                        return <div className={style.depItem} key={item.name}>
                            <h5>{item.name}</h5>
                            <p>{item.allCount}台</p>
                        </div>
                    })
                }
            </div>
        </div>
    </div>
}
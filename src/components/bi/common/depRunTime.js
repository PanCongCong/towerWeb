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
    const [selectItem, setSelect] = useState('2');
    const [loading, setLoading] = useState(false);
    const [depData, setDepData] = useState([]);

    useEffect(() => {
        echart = echarts.init(chart.current);
    }, [])
    useEffect(() => {
        if (!chart.current) return;
        setLoading(true);
        axios.post('appTower/queryHistoryTowerByDepart', {
            status: mappingType[type], id: getParamId(), dayStatus: selectItem,
            // time: 1591221600000
        }).then(res => {
            const { data = [] } = res || {};
            setDepData(data);

            const xData = data.map(item => item.departmentName);
            const yData = data.map(item => (item.time*100).toFixed(2));
            const yData2 = data.map(item => (item.kongTime*100).toFixed(2));
            const fz = 3;
            const option = {
                tooltip: {
                    trigger: 'axis'
                    // formatter:'{a0}{c0}次'
                },
                legend: {
                    show: true,
                    right: 0,
                    top: 0,
                    textStyle: {
                        color: '#fff'
                    }
                },
                grid: {
                    show: false,
                    left: 10,
                    right: 5,
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
                        name: "%",
                        min: 0,
                        max: 100,
                        nameTextStyle: {
                            color: '#fff',
                            align: 'left'
                        },
                        type: "value",
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
                        name: '使用',
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
                        name: '停载',
                        type: "bar",
                        data: yData2,
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
        })

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
        <div className={[style.cardContent, style.depWrap].join(' ')}>
            <div ref={chart} className={style.depChart}></div>
            <div className={style.depInfo}>
                {
                    depData.map(item => {
                        return <div className={style.depItem} key={item.departmentName}>
                            <h5>{item.departmentName}</h5>
                            <p>{(item.time*100).toFixed(2)}%</p>
                        </div>
                    })
                }
            </div>
        </div>
    </div>
}
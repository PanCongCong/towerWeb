// 首页左二，有效吊次
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
            const yData = data.map(item => item.count);
            // const fz = 3;
            const option = {
                grid: {
                    show: false,
                    left: 20,
                    right: 20,
                    top: 40,
                    bottom: 20,
                    containLabel: true
                },
                tooltip:{
                    trigger:'axis',
                    formatter:'{b0}<br/>{c0}次'
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
                        name:"次",
                        nameTextStyle:{
                            color:'#fff',
                            align:'left'
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
                        barMaxWidth:20,
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
                    }
                ],
                animation: true
            };
            echart.setOption(option);
        }).finally(()=>{
            setLoading(false);
        });
    }, [selectItem])

    return <div className={style.card}>
        <div className={style.cardTitle}>
            有效吊次
            
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
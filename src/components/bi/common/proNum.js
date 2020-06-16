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
    const [loading, setLoading] = useState(false);
    const [selectItem, setSelect] = useState('2');
    useEffect(() => {
        echart = echarts.init(chart.current);
    }, [])
    useEffect(() => {
        if (!chart.current) return;
        setLoading(true);
        axios.post('/appTower/queryHistoryTowerByDepart', {
            status: mappingType[type], id: getParamId(), dayStatus: selectItem
        }).then(res => {
            const { data = [] } = res || {};
            const xData = data.map(item => item.xmid_name || item.name);
            const yData = data.map(item => item.count);
            const option = {
                color: ['rgba(73, 101, 229, 1)', 'rgba(42, 209, 143, 1)', 'rgba(146, 82, 233, 1)'],
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
                        color: "rgba(255, 255, 255, 0.85)"
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
                        name: "次",
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
                series: {
                    type: "line",
                    data: yData
                },
                animation: true
            };
            echart.setOption(option);
        })

    }, [selectItem])

    return <div className={style.card}>
        <div className={style.cardTitle}>
            吊重吊次
            <div className={style.cardBtnGroup}>
                <span className={selectItem === '1' ? style.active : ''} onClick={() => setSelect('1')}>日</span>
                <span className={selectItem === '2' ? style.active : ''} onClick={() => setSelect('2')}>周</span>
                <span className={selectItem === '3' ? style.active : ''} onClick={() => setSelect('3')}>月</span>
            </div>
        </div>
        <div className={style.cardContent}>
            <div ref={chart} style={{ height: '100%', width: '100%' }}></div>
        </div>
    </div>
}
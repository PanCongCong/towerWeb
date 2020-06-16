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

    const [loading, setLoading] = useState(false);
    const chart = useRef(null);
    const [selectItem, setSelect] = useState('2');
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
        })
        axios.post('appTower/queryHistoryTowerByDepartCount', {
            // time: 1591221600000,
            dayStatus: selectItem
        }).then(res => {
            echart.clear();
            const { data = [] } = res || {};
            const xData = [];
            const yData = {};
            data.forEach(item => {
                if (selectItem === '1') { item.days = new Date(item.days).getHours() };
                if (xData.indexOf(item.days) < 0) {
                    xData.push(item.days);
                }
                if (!yData[item.departmentName]) {
                    yData[item.departmentName] = [];
                }
                yData[item.departmentName].push(item.count);
            })
            const series = Object.keys(yData).map(item => {
                return {
                    name: item,
                    type: "line",
                    data: yData[item]
                };
            })
            const option = {
                color: ['rgba(73, 101, 229, 1)', 'rgba(42, 209, 143, 1)', 'rgba(146, 82, 233, 1)'],
                tooltip: {
                    trigger: 'axis'
                    // formatter:'{a0}{c0}次'
                },
                grid: {
                    show: false,
                    left: 10,
                    right: 5,
                    top: 30,
                    bottom: 30,
                    containLabel: true
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
                series: series,
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
        <div className={[style.cardContent, style.depWrap].join(' ')}>
            <div ref={chart} className={style.depChart}></div>
            <div className={style.depInfo}>
                {
                    depData.map(item => {
                        return <div className={style.depItem} key={item.departmentName}>
                            <h5>{item.departmentName}</h5>
                            <p>{item.count}次</p>
                        </div>
                    })
                }
            </div>
        </div>
    </div>
}
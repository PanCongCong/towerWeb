// 首页左上角，总数量、正常、异常
import React, { useEffect, useRef, useState } from 'react';
import echarts from 'echarts';
import axios from 'axios';
import { Spin } from 'antd';

import { getItem, mappingType, getParamId } from './../../../tools/baseTool';

import style from './../index.module.less';

export default function () {
    const loginInfo = getItem('loginInfo');
    const { type } = loginInfo;

    const chart = useRef(null);
    const [resData, setResData] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!chart.current) return;
        setLoading(true);
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();

        axios.post('/appTower/queryTowerException', {
            status: mappingType[type], idString: getParamId()
        }, {
            cancelToken: source.token
        }).then(res => {
            if (res.status !== 200) return;
            const { data = [] } = res || {};
            setResData(data);
            // return;
            const echart = echarts.init(chart.current);
            const val = data.allCount ? (data.runCount / data.allCount).toFixed(2) : 1;
            const sum = data.allCount
            const option = {
                "title": [
                    {
                        "show": true,
                        "text": sum,
                        "left": "center",
                        "top": "center",
                        "textStyle": {
                            "color": "#fff",
                            "fontSize": 18,
                            "fontFamily": "MicrosoftYaHei",
                            "fontWeight": "bold",
                            "align": "center"
                        }
                    },
                    {
                        "show": true,
                        "text": `总数量`,
                        "left": "center",
                        "top": "70%",
                        "textStyle": {
                            "color": "#fff",
                            "fontSize": 12,
                            "fontFamily": "MicrosoftYaHei",
                            "align": "center"
                        }
                    }
                ],
                "series": [
                    {
                        "name": "仪表盘2",
                        "type": "gauge",
                        "radius": "80%",
                        "splitNumber": 10,
                        "axisLine": {
                            "lineStyle": {
                                "color": [
                                    [
                                        1,
                                        {
                                            "x": 0,
                                            "y": 0,
                                            "x2": 1,
                                            "y2": 0,
                                            "type": "linear",
                                            "global": false,
                                            "colorStops": [
                                                {
                                                    "offset": 0,
                                                    "color": "#279BF8"
                                                },
                                                {
                                                    "offset": val,
                                                    "color": "#279BF8"
                                                },
                                                {
                                                    "offset": 1,
                                                    "color": "#C0429B"
                                                }
                                            ]
                                        }
                                    ]
                                ],
                                "width": 6
                            }
                        },
                        "axisLabel": {
                            "show": false
                        },
                        "axisTick": {
                            "show": false
                        },
                        "splitLine": {
                            "show": false
                        },
                        "itemStyle": {
                            "show": false
                        },
                        "detail": {
                            "show": false
                        },
                        "data": [
                            {
                                "value": val
                            }
                        ],
                        "pointer": {
                            "show": false
                        }
                    }
                ]
            };
            echart.setOption(option);
        })
        return () => {
            source.cancel();
        }
    }, [])

    return <div className={style.card}>
        <div className={style.cardTitle}>运行监测系统上线设备</div>
        <div className={style.cardContent}>
            <div ref={chart} style={{ height: '130px', width: '130px' }}></div>
            <div className={style.sumInfo}>
                <div className={style.sumInfoItem}>
                    <span className={style.sumInfoSuccess}>正常</span>
                    <span className={style.sumInfoSuccessText}>{resData.runCount || 0}</span>
                    <span>{resData.allCount ? (resData.runCount / resData.allCount * 100).toFixed(2) : 0}%</span>
                </div>
                <div className={style.sumInfoItem}>
                    <span className={style.sumInfoError}>异常</span>
                    <span className={style.sumInfoErrorText}>{resData.exceCount || 0}</span>
                    <span>{resData.allCount ? (resData.exceCount / resData.allCount * 100).toFixed(2) : 0}%</span>
                </div>
            </div>
        </div>
    </div>
}
import React, { useRef, useEffect } from 'react';
import echarts from 'echarts';

import style from './../index.module.less';
export default function () {
    const dom = useRef();
    useEffect(() => {
        let echart = echarts.init(dom.current);
        const data = [{ name: '广州经理部', value: 5 }, { name: '深圳经理部', value: 17 }, { name: '厦门经理部', value: 15 }];
        let sum = 0;
        data.forEach(item => sum += item.value);
        const option = {
            color: ['#FBB318', '#4965E5', '#9252E9'],
            title: {
                text: '{val|' + sum + '}\n{name|总数量}',
                left: 'center',
                top: 'center',
                textStyle: {
                    rich: {
                        name: {
                            fontSize: 12,
                            fontWeight: 'normal',
                            color: '#CDCED1',
                            padding: [5, 0]
                        },
                        val: {
                            fontSize: 18,
                            fontWeight: 'bold',
                            color: '#00FAFF',
                        }
                    }
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: '{b}： <br/> {c}天 ({d}%)'
            },
            legend: {
                bottom: 0,
                textStyle: {
                    color: "#fff"
                }
            },
            series: [
                {
                    name: '姓名',
                    type: 'pie',
                    radius: ['35%', '50%'],
                    center: ['50%', '50%'],
                    data: data,
                    labelLine: {
                        normal: {
                            length: 20,
                            length2: 80,
                            lineStyle: {
                                color: '#e6e6e6'
                            }
                        }
                    },
                    label: {
                        normal: {
                            formatter: params => {
                                return (
                                    '{icon|●}{name|' + params.name + '}{value|' +
                                    params.value + '天}'
                                );
                            },
                            padding: [0, -100, 25, -100],
                            rich: {
                                icon: {
                                    fontSize: 16
                                },
                                name: {
                                    fontSize: 12,
                                    padding: [0, 4, 0, 4],
                                    color: '#fff'
                                },
                                value: {
                                    fontSize: 12,
                                    fontWeight: 'bold',
                                    color: '#fff'
                                }
                            }
                        }
                    }
                }
            ]
        };
        echart.setOption(option);
    }, [])
    return <>
        <div className={style.partTit}>有效吊次为0项目天数</div>
        <div className={style.chart} ref={dom}></div>
        <div className={style.des}>各经理部有多少项目出现了塔吊数据运行未上传情况；各经理部本月塔吊有效吊次为0的项目有多少个。</div>
    </>;
}
import React, { useRef, useEffect, useState } from 'react';
import echarts from 'echarts';
import { Select, Modal, Progress } from 'antd';

import map from './../../../json/map-china.json';
import style from './../index.module.less';

const geoCoordMap = {
    "汉溪新世界": [113.12244, 23.009505],
};
const data = [
    { name: "汉溪新世界", value: 199, id: 1 }
];
export default function () {
    const mapChart = useRef(null);
    const lineChartt = useRef(null);
    const [xmid, setXmid] = useState(null);
    const [showXm, setShowXm] = useState(false);

    const hideModel = () => {
        setShowXm(false);
        setXmid(null);
    }

    const convertData = () => {
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var geoCoord = geoCoordMap[data[i].name];
            if (geoCoord) {
                res.push({
                    id: data[i].id,
                    name: data[i].name,
                    value: geoCoord.concat(data[i].value)
                });
            }
        }
        return res;
    };
    useEffect(() => {

        let optionXyMap01 = {
            animation: true,
            animationDuration: 1000,
            animationEasing: "cubicInOut",
            animationDurationUpdate: 1000,
            animationEasingUpdate: "cubicInOut",
            tooltip: {
                trigger: "axis", // hover触发器
                axisPointer: {
                    // 坐标轴指示器，坐标轴触发有效
                    type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
                    shadowStyle: {
                        color: "rgba(150,150,150,0.1)" //hover颜色
                    }
                }
            },
            geo: {
                show: true,
                map: "china",
                roam: true,
                zoom: 1,
                // center: [108.5, 30], //中心点
                label: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: false,
                    }
                },
                itemStyle: {
                    normal: {
                        borderColor: "rgba(147, 235, 248, 1)",
                        borderWidth: 1,
                        areaColor: {
                            type: "radial",
                            x: 0.5,
                            y: 0.5,
                            r: 0.5,
                            colorStops: [
                                {
                                    offset: 0,
                                    color: "rgba(147, 235, 248, 0)" // 0% 处的颜色
                                },
                                {
                                    offset: 1,
                                    color: "rgba(147, 235, 248, .2)" // 100% 处的颜色
                                }
                            ],
                            globalCoord: false // 缺省为 false
                        }
                    },
                    emphasis: {
                        areaColor: "#389BB7",
                        borderWidth: 0
                    }
                }
            },
            series: [{
                symbolSize: 5,
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'right',
                        show: true
                    },
                    emphasis: {
                        show: true
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#fff'
                    }
                },
                name: 'light',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: convertData(data),

            },
            {
                type: 'map',
                map: 'china',
                geoIndex: 0,
                aspectScale: 0.75, //长宽比
                showLegendSymbol: false, // 存在legend时显示
                label: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: false,
                        textStyle: {
                            color: '#fff'
                        }
                    }
                },
                roam: true,
                itemStyle: {
                    normal: {
                        areaColor: '#031525',
                        borderColor: '#FFFFFF',
                    },
                    emphasis: {
                        areaColor: '#2B91B7'
                    }
                },
                animation: false,
                data: data
            },
            {
                name: '设备情况',
                type: 'scatter',
                coordinateSystem: 'geo',
                symbol: 'pin',
                symbolSize: [50, 50],
                label: {
                    normal: {
                        show: true,
                        textStyle: {
                            color: '#fff',
                            fontSize: 9,
                        },
                        formatter(value) {
                            return value.data.value[2]
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#D8BC37', //标志颜色
                    }
                },
                data: convertData(data),
                showEffectOn: 'render',
                rippleEffect: {
                    brushType: 'stroke'
                },
                hoverAnimation: true,
                zlevel: 1
            }
            ]
        };
        echarts.registerMap("china", map);
        let chart = echarts.init(mapChart.current);
        chart.setOption(optionXyMap01);

        chart.on("click", params => {
            console.log(params);
            if (params.seriesIndex === 2) {
                const { data: { id } = {} } = params;
                setXmid(id);
            }
        });

    }, [])

    useEffect(() => {
        if (xmid !== null) {
            // 查询数据
            setShowXm(true);
            setTimeout(() => {
                const xData = ['08', '09', '10', '11', '12'];
                const yData = [3, 4, 6, 6, 7];
                let chart = echarts.init(lineChartt.current);
                chart.setOption({
                    color: ['rgba(73, 101, 229, 1)', 'rgba(42, 209, 143, 1)', 'rgba(146, 82, 233, 1)'],
                    grid: {
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
                    series: {
                        type: "line",
                        data: yData,
                        lineStyle: {
                            normal: {
                                color: "#4965E5",
                                width: 3
                            }
                        },
                        areaStyle: {
                            color: {
                                type: "linear",
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [
                                    {
                                        offset: 0,
                                        color: "rgba(73, 101, 229, 1)" // 0% 处的颜色
                                    },
                                    {
                                        offset: 1,
                                        color: "rgba(73, 101, 229, 0)" // 100% 处的颜色
                                    }
                                ],
                                global: false // 缺省为 false
                            }
                        },
                        smooth: true
                    }
                });
                chart.resize();
            }, 300);

        }
    }, [xmid])
    return <div className={style.map}>
        <div className={style.topBar}>
            <div>塔吊运行关键指标分布</div>
            <div className={style.selectGroup}>
                <Select placeholder="选择分公司">
                    <Select.Option>广州分公司</Select.Option>
                </Select>
                <Select placeholder="选择项目">
                    <Select.Option>汉溪新世界</Select.Option>
                </Select>
                <Select placeholder="地区">
                    <Select.Option>湖北省</Select.Option>
                </Select>
                <Select placeholder="状态">
                    <Select.Option>正常</Select.Option>
                    <Select.Option>停工</Select.Option>
                </Select>
            </div>
        </div>
        <div className={style.content}>
            <div ref={mapChart} className={style.chart}></div>
        </div>
        <Modal footer={null} onCancel={hideModel} visible={showXm} wrapClassName={style.model}>
            <div className={style.modelTop}>
                汉溪新世界
                <p>塔吊数：4台</p>
            </div>
            <div className={style.modelContent}>
                <div className={style.proRow}>
                    <span>有效使用率：</span>
                    <span className={style.num}>30%</span>
                    <Progress percent={30} strokeColor="#FBB318" trailColor="#131B2F" showInfo={false} />
                </div>
                <div className={style.proRow}>
                    <span>日间使用率：</span>
                    <span className={style.num}>50%</span>
                    <Progress percent={50} strokeColor="#4965E5" trailColor="#131B2F" showInfo={false} />
                </div>
                <div className={style.proRow}>
                    <span>夜间使用率：</span>
                    <span className={style.num}>20%</span>
                    <Progress percent={20} strokeColor="#2AD18F" trailColor="#131B2F" showInfo={false} />
                </div>
            </div>
            <div className={style.modelFotter}>
                今日吊次统计
                <div ref={lineChartt} style={{ height: '300px', width: '100%' }}></div>
            </div>
        </Modal>
    </div>
}
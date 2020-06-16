/* eslint-disable no-undef */
import React, { useRef, useEffect, useState } from 'react';
import echarts from 'echarts';
import axios from 'axios';
import { Select, Modal, Progress } from 'antd';

import map from './../../../json/mapJson/china.json';
import style from './../index.module.less';
import { getItem } from './../../../tools/baseTool';

export default function () {
    const mapChart = useRef(null);
    const lineChartt = useRef(null);
    const [xmid, setXmid] = useState(null);
    const [xmName, setXmName] = useState('');
    const [showXm, setShowXm] = useState(false);
    const [detail, setDetail] = useState({});
    const [deps, setDeps] = useState([]);
    const [dep, setDep] = useState();
    const [pros, setPros] = useState([]);
    const [proXmid, setProXmid] = useState();

    const hideModel = () => {
        setShowXm(false);
        setXmid(null);
    }
    useEffect(() => {
        const userInfo = getItem('userInfo');
        const loginInfo = getItem('loginInfo');
        const { departmentInfos = [] } = userInfo;
        let xy = [];
        setDeps(departmentInfos);
        departmentInfos.forEach(item => {
            if (item.managDepartmentInfos) {
                if (dep != undefined && item.departmentId != dep) return;
                if (loginInfo.type === 'dep' && loginInfo.data && loginInfo.data.dep && item.departmentId !== loginInfo.data.dep.departmentId) {
                    return;
                }
                item.managDepartmentInfos.forEach(m => {
                    if (proXmid != undefined && m.xmid != proXmid) return;
                    if (m.lat) {
                        xy.push({
                            'xmid': m.xmid,
                            'name': m.xmidName,
                            'y': m.lat,
                            'x': m.lon
                        })
                    }
                })
            }
        })
        // 百度地图API功能
        var map = new BMap.Map("allmap");    // 创建Map实例
        var mapStyle = { style: "midnight" }
        map.setMapStyle(mapStyle);
        map.centerAndZoom(new BMap.Point(118.871327, 32.151263), 6);  // 初始化地图,设置中心点坐标和地图级别
        map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
        map.addControl(new BMap.NavigationControl({ enableGeolocation: true }));
        map.addControl(new BMap.OverviewMapControl());
        map.setCurrentCity("广州");          // 设置地图显示的城市 此项是必须设置的
        map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放

        var markers = [];
        var pt = null;
        for (var i in xy) {
            pt = new BMap.Point(xy[i].x, xy[i].y);
            markers.push(new BMap.Marker(pt));
        }
        console.log(markers);
        //最简单的用法，生成一个marker数组，然后调用markerClusterer类即可。
        var markerClusterer = new BMapLib.MarkerClusterer(map,
            {
                markers: markers,
                data: xy,
                click: (e) => { setXmid(e.xmid); setXmName(e.name) },
                girdSize: 100,
                styles: [{
                    url: './../../../imgs/blue.png',
                    size: new BMap.Size(92, 92),
                    backgroundColor: '#E64B4E'
                }],
            });
        markerClusterer.setMaxZoom(13);
        markerClusterer.setGridSize(100);
    }, [dep, proXmid])

    useEffect(() => {
        if (xmid !== null) {
            // 查询数据
            axios.post('appTower/queryTowerRatio', { xmid }).then(res => {
                setShowXm(true);
                setDetail(res.data);
                let chart = echarts.init(lineChartt.current);
                chart.clear();
                if (res.data.list && res.data.list.length > 0) {
                    const { list } = res.data;
                    const xData = list.map(item => item.days);
                    const yData = list.map(item => item.count);

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
                }
            })
        }
    }, [xmid])

    useEffect(() => {
        setProXmid();
        setPros([]);
        if (dep != undefined) {
            deps.some(item => {
                if (item.departmentId == dep) {
                    console.log(item.managDepartmentInfos);
                    setPros(item.managDepartmentInfos);
                    return true;
                }
                return false;
            })
        }
    }, [dep])
    return <div className={style.map}>
        <div className={style.topBar}>
            <div>塔吊运行关键指标分布</div>
            <div className={style.selectGroup}>
                {/* <Select placeholder="选择分公司">
                    <Select.Option>广州分公司</Select.Option>
                </Select> */}
                <Select placeholder="经理部" onChange={(depId) => { setDep(depId) }} allowClear>
                    {
                        deps.map(item => {
                            return <Select.Option value={item.departmentId} key={item.departmentId}>{item.departmentName}</Select.Option>
                        })
                    }
                </Select>
                <Select placeholder="选择项目" value={proXmid} onChange={(xmid) => { setProXmid(xmid) }} allowClear>
                    {
                        pros.map(item => {
                            return <Select.Option value={item.xmid} key={item.xmid}>{item.xmidName}</Select.Option>
                        })
                    }
                </Select>

                <Select placeholder="状态">
                    <Select.Option value={0}>正常</Select.Option>
                    <Select.Option value={1}>停工</Select.Option>
                </Select>
            </div>
        </div>
        <div className={style.content}>
            <div ref={mapChart} className={style.chart} id="allmap"></div>
        </div>
        <Modal footer={null} onCancel={hideModel} visible={showXm} wrapClassName={style.model}>
            <div className={style.modelTop}>
                {xmName}
                <p>塔吊数：{detail.size}台</p>
            </div>
            <div className={style.modelContent}>
                <div className={style.proRow}>
                    <span>有效使用率：</span>
                    <span className={style.num}>{(detail.userRatio * 100).toFixed(2)}%</span>
                    <Progress percent={detail.userRatio * 100} strokeColor="#FBB318" trailColor="#131B2F" showInfo={false} />
                </div>
                <div className={style.proRow}>
                    <span>日间使用率：</span>
                    <span className={style.num}>{(detail.dayRatio * 100).toFixed(2)}%</span>
                    <Progress percent={detail.dayRatio * 100} strokeColor="#4965E5" trailColor="#131B2F" showInfo={false} />
                </div>
                <div className={style.proRow}>
                    <span>夜间使用率：</span>
                    <span className={style.num}>{(detail.nightRatio * 100).toFixed(2)}%</span>
                    <Progress percent={detail.nightRatio * 100} strokeColor="#2AD18F" trailColor="#131B2F" showInfo={false} />
                </div>
            </div>
            <div className={style.modelFotter}>
                今日吊次统计
                <div ref={lineChartt} style={{ height: '300px', width: '100%' }}></div>
            </div>
        </Modal>
    </div>
}
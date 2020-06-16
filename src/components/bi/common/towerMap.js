import React, { useRef, useEffect, useState } from 'react';
import echarts from 'echarts';
import { Select } from 'antd';
import axios from 'axios';
import { Spin } from 'antd';

import { getItem, mappingType, getParamId } from './../../../tools/baseTool';

import style from './../index.module.less';

import gouziSrc from './../../../imgs/tower-gouzi.png';
import huakuaiSrc from './../../../imgs/tower-huakuai.png';
import tajiSrc from './../../../imgs/tower-taji.png';

let ctx = null;
let canvasInitObj = {
    startPointx: 205,
    startPointy: 145,
    speed: 0.5
};
const scale = 1;//document.body.clientHeight / 700;
export default function () {
    const [towerList, setTowerList] = useState([]);
    const [towerBase, setTowerBase] = useState([]);
    const [towerInfo, setTowerInfo] = useState({});
    const canvasRef = useRef();
    const gouziRef = useRef();
    const huakuaiRef = useRef();
    const tajiRef = useRef();

    const initCanvas = () => {
        const canvas1 = canvasRef.current;
        canvas1.height = 650 * scale;
        canvas1.width = 800 * scale;
        let context1 = (ctx = canvas1.getContext("2d"));
        let gouzi = gouziRef.current;
        let taji = tajiRef.current;
        let huakuai = huakuaiRef.current;
        gouzi.onload = function () {
            context1.drawImage(
                gouzi,
                0,
                0,
                gouzi.width,
                gouzi.height,
                200 * scale,
                160 * scale,
                1.5 * gouzi.width * scale,
                1.5 * gouzi.height * scale
            );
        };
        taji.onload = function () {
            context1.drawImage(
                taji,
                0,
                0,
                taji.width,
                taji.height,
                0,
                0,
                1.5 * taji.width * scale,
                1.5 * taji.height * scale
            );
        };
        huakuai.onload = function () {
            context1.drawImage(
                huakuai,
                0,
                0,
                huakuai.width,
                huakuai.height,
                205 * scale,
                145 * scale,
                1.5 * huakuai.width * scale,
                1.5 * huakuai.height * scale
            );
        };
    }

    const canvasStart = (data) => {
        if (data === undefined) {
            data = {}
        }
        let tabData = JSON.parse(JSON.stringify(data));
        if (tabData.height < 0) {
            tabData.height = 0;
        }
        const towerHeight = towerBase.fjzd5 || 120;
        tabData.height = towerHeight - tabData.height;
        const towerWidth = towerBase.fjzd2 || 70;
        if (tabData.height < 0) {
            tabData.height = 0;
        }
        let interval = setInterval(() => {
            if (canvasInitObj.speed == 0) {
                /*如果已经停止动画了，则清除定时器*/
                canvasInitObj.speed = 0.5;
                clearInterval(interval);
                return;
            } else {
                let x =
                    parseInt(tabData.radius) * (350 / parseInt(towerWidth)) + 205;
                let y =
                    parseInt(tabData.height) * (450 / parseInt(towerHeight)) + 160;
                canvasMove(x, y);
            }
        }, 8);
        return interval;
    }

    const canvasMove = (x, y) => {
        let gouzi = gouziRef.current;
        let taji = tajiRef.current;
        let huakuai = huakuaiRef.current;
        ctx.clearRect(0, 0, 800, 650);
        if (canvasInitObj.startPointx > x) {
            canvasInitObj.startPointx -= canvasInitObj.speed;
            if (canvasInitObj.startPointy > y) {
                canvasInitObj.startPointy -= canvasInitObj.speed;
                if (canvasInitObj.startPointy <= y) {
                    canvasInitObj.speed = 0;
                }
            }
        } else if (
            canvasInitObj.startPointx <= x &&
            canvasInitObj.startPointx >= x - 1
        ) {
            //   canvasInitObj.startPointx == canvasInitObj.startPointx;
            if (canvasInitObj.startPointy > y) {
                canvasInitObj.startPointy -= canvasInitObj.speed;
                if (canvasInitObj.startPointy <= y) {
                    canvasInitObj.speed = 0;
                }
            } else if (canvasInitObj.startPointy < y) {
                canvasInitObj.startPointy += canvasInitObj.speed;
                if (canvasInitObj.startPointy >= y) {
                    canvasInitObj.speed = 0;
                }
            } else canvasInitObj.speed = 0;
        }
        if (canvasInitObj.startPointx < x) {
            canvasInitObj.startPointx += canvasInitObj.speed;
            if (canvasInitObj.startPointy < y) {
                canvasInitObj.startPointy += canvasInitObj.speed;
                if (canvasInitObj.startPointy >= y) {
                    canvasInitObj.speed = 0;
                }
            }
        }
        ctx.beginPath();
        ctx.drawImage(
            gouzi,
            0,
            0,
            gouzi.width,
            gouzi.height,
            (canvasInitObj.startPointx - 5) * scale,
            canvasInitObj.startPointy * scale,
            1.5 * gouzi.width * scale,
            1.5 * gouzi.height * scale
        );
        ctx.drawImage(
            huakuai,
            0,
            0,
            huakuai.width,
            huakuai.height,
            canvasInitObj.startPointx * scale,
            145 * scale,
            1.5 * huakuai.width * scale,
            1.5 * huakuai.height * scale
        );
        ctx.drawImage(
            taji,
            0,
            0,
            taji.width,
            taji.height,
            0,
            0,
            1.5 * taji.width * scale,
            1.5 * taji.height * scale
        );
        ctx.moveTo((canvasInitObj.startPointx + 20) * scale, 160 * scale);
        ctx.lineTo((canvasInitObj.startPointx + 20) * scale, canvasInitObj.startPointy * scale);
        ctx.stroke();
        ctx.closePath();
        ctx.fill();
    }

    useEffect(() => {
        initCanvas();
        // 获取塔吊数据
        axios.post('/appTower/queryTowers', {
            xmid: getParamId()
        }).then(res => {
            const { data = [] } = res || {};
            setTowerList(data);
            if (data.length > 0) {
                setTowerBase(data[0]);
            }
        })
    }, [])

    useEffect(() => {
        let interval = null;
        if (!towerBase.wlid) return;
        // 选择塔吊后，开始设置值
        axios.post('/appTower/queryNewestTower.do', {
            sn: towerBase.wlid,
            xmid: towerBase.xmid
        }).then(res => {
            const { resultObj = [] } = res;
            setTowerInfo(resultObj[0] || {});

            interval = canvasStart(resultObj[0]);
        });
        return () => {
            clearInterval(interval);
        }
    }, [towerBase])

    const handleSelect = (idx) => {
        setTowerBase(towerList[idx]);
    }

    return <div className={style.map}>
        <div className={style.topBar}>
            <div>塔吊运行关键指标分布</div>
            <div className={style.selectGroup}>
                <Select placeholder="塔吊" defaultValue={0} onSelect={handleSelect}>
                    {
                        towerList.map((item, index) => {
                            return <Select.Option value={index} key={item.id}>{item.mc}</Select.Option>
                        })
                    }
                </Select>
            </div>
        </div>
        <div className={[style.content, style.towerMap].join(' ')}>
            <div className={style.wrap}>
                <img src={gouziSrc} ref={gouziRef} style={{ display: 'none' }} alt="钩子" />
                <img src={huakuaiSrc} ref={huakuaiRef} style={{ display: 'none' }} alt="滑块" />
                <img src={tajiSrc} ref={tajiRef} style={{ display: 'none' }} alt="塔机" />
                <canvas ref={canvasRef} className={style.canvas}></canvas>
            </div>
            <div className={style.info}>
                <div className={style.row}>
                    <div className={style.infoCard}>
                        <div className={style.tit}>
                            <i className="iconfont icon-iAngle"></i>
                            回转角度
                        </div>
                        <div className={style.num}>
                            {towerInfo.angle || 0}°
                        </div>
                    </div>
                    <div className={style.infoCard}>
                        <div className={style.tit}>
                            <i className="iconfont icon-autoWidth"></i>
                            幅度
                        </div>
                        <div className={style.num}>
                            {towerInfo.radius || 0}m
                        </div>
                    </div>
                    <div className={style.infoCard}>
                        <div className={style.tit}>
                            <i className="iconfont icon-gaodu"></i>
                            吊钩高度
                        </div>
                        <div className={style.num}>
                            {towerInfo.height || 0}m
                        </div>
                    </div>
                    <div className={style.infoCard}>
                        <div className={style.tit}>
                            <i className="iconfont icon-zhongliangweight9"></i>
                            吊重
                        </div>
                        <div className={style.num}>
                            {towerInfo.loads || 0}t
                        </div>
                    </div>
                </div>
                <div className={style.row}>
                    <div className={style.infoCard}>
                        <div className={style.tit}>
                            <i className="iconfont icon-baifenbi"></i>
                            力矩百分比
                        </div>
                        <div className={style.num}>
                            {towerInfo.percent || 0}%
                        </div>
                    </div>
                    <div className={style.infoCard}>
                        <div className={style.tit}>
                            <i className="iconfont icon-anquan"></i>
                            安全吊重
                        </div>
                        <div className={style.num}>
                            {towerInfo.safeLoads || 0}t
                        </div>
                    </div>
                    <div className={style.infoCard}>
                        <div className={style.tit}>
                            <i className="iconfont icon-fengsu"></i>
                            风速
                        </div>
                        <div className={style.num}>
                            {towerInfo.windSpeed || 0}级
                        </div>
                    </div>
                    <div className={style.infoCard}>
                        <div className={style.tit}>
                            <i className="iconfont icon-diaogougaodu-"></i>
                            吊绳倍率
                        </div>
                        <div className={style.num}>
                            {towerInfo.fall || 0}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}
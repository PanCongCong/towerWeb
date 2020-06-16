import React, { useEffect, useState } from 'react';
import { DatePicker, Select, Table, Button, Spin } from 'antd';
import axios from 'axios';
import moment from 'moment';
import { getItem } from './../../../tools/baseTool';

const { RangePicker } = DatePicker;

const colums = [{
    title: "序号",
    dataIndex: 'index',
    key: "index",
    render: (_text, _record, index) => `${index + 1}`,
}, {
    title: "开始时间",
    dataIndex: 'startDeviceTime',
    key: "startDeviceTime",
    render: (record) => {
        return moment(record).format('YYYY-MM-DD HH:mm')
    }
}, {
    title: "结束时间",
    dataIndex: 'endDeviceTime',
    key: "endDeviceTime",
    render: (record) => {
        return moment(record).format('YYYY-MM-DD HH:mm')
    }
}, {
    title: "开始角度",
    dataIndex: 'startAngle',
    key: "startAngle"
}, {
    title: "结束角度",
    dataIndex: 'endAngle',
    key: "endAngle"
}, {
    title: "吊重",
    dataIndex: 'loads',
    key: "loads"
}, {
    title: "报警状态",
    dataIndex: 'errMsg',
    key: "errMsg"
}]
const pageSize = 10;
export default function () {
    const userInfo = getItem('userInfo');

    const [list, setList] = useState([]);
    const [current, setCurrent] = useState(1);
    const [total, setTotal] = useState(1);

    const [deps, setDeps] = useState([]);
    const [pros, setPros] = useState([]);
    const [towers, setTowers] = useState([]);
    const [searchTime, setSearchTime] = useState();
    const [searchDep, setSearchDep] = useState();
    const [searchPro, setSearchPro] = useState();
    const [searchTower, setSearchTower] = useState();

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // 初始化经理部选择器
        if (userInfo && userInfo.departmentInfos) {
            setDeps(userInfo.departmentInfos);
        }
    }, []);

    useEffect(() => {
        if (searchDep) {
            setPros([]);
            setSearchPro();
            // 设置经理部选择器
            console.log(searchDep);
            if (userInfo && userInfo.departmentInfos) {
                userInfo.departmentInfos.some(item => {
                    if (item.departmentId === searchDep) {
                        setPros(item.managDepartmentInfos || []);
                    }
                })
            }
        }
    }, [searchDep]);
    useEffect(() => {
        if (!searchPro) return;
        setLoading(true)
        axios.post('/appTower/queryTowers', {
            xmid: searchPro
        }).then(res => {
            const { data = [] } = res || {};
            setTowers(data);
        }).finally(() => { setLoading(false); })
    }, [searchPro])

    useEffect(() => {
        // 触发翻页
        getData();
    }, [current])

    const handleClick = () => {
        if (current === 1) {
            getData()
        } else {
            setCurrent(1);
        }
    }

    const getData = () => {
        if (!searchTower) return;
        setLoading(true)
        const [satrtTime, endTime] = searchTime || [];
        axios.post('appTower/queryNewestTowerDetail', {
            xmid: '0016',
            pageNum: current,
            pageSize: pageSize,
            sn: searchTower,
            startTime: satrtTime ? satrtTime.startOf('day').valueOf() : null,
            endTime: endTime ? endTime.endOf('day').valueOf() : null
        }).then(res => {
            const { resultObj = {} } = res || {};
            setList(resultObj.list);
            setTotal(resultObj.total);
        })
            .finally(() => setLoading(false))
    }
    const paginationProps = {
        pageSize: pageSize,
        current: current,
        total: total,
        onChange: (c) => { setCurrent(c); }
    }
    
    return <div className="content">
        {
            loading ? <Spin className="loading-full" /> : null
        }
        <div className="searchBar">
            <div className="searchItem">
                <RangePicker onChange={(date) => { setSearchTime(date); }} />
            </div>
            <div className="searchItem">
                <Select placeholder="选择经理部" onChange={(val) => { setSearchDep(val); }} value={searchDep} allowClear>
                    {
                        deps.map(item => <Select.Option value={item.departmentId} key={item.departmentId}>{item.departmentName}</Select.Option>)
                    }
                </Select>
            </div>
            <div className="searchItem">
                <Select placeholder="选择项目" onChange={(val) => { setSearchPro(val); }} value={searchPro} allowClear>
                    {
                        pros.map(item => <Select.Option value={item.xmid} key={item.xmid}>{item.xmidName}</Select.Option>)
                    }
                </Select>
            </div>
            <div className="searchItem">
                <Select placeholder="选择塔吊" onChange={(val) => { setSearchTower(val); }}>
                    {
                        towers.map(item => <Select.Option value={item.wlid} key={item.wlid}>{item.mc}</Select.Option>)
                    }
                </Select>
            </div>
            <Button.Group>
                <Button onClick={handleClick}>查询</Button>
            </Button.Group>
        </div>
        <div>
            <div className="tableTit">
                吊重数据
            </div>
            <Table columns={colums} bordered dataSource={list} rowKey="id" pagination={paginationProps}></Table>
        </div>
    </div>
}
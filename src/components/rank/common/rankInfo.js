import React, { useState } from 'react';
import { Table } from 'antd'
import moment from 'moment';
import style from './../index.module.less';

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
    title: "单位",
    dataIndex: '1',
    key: "1"
}, {
    title: "有效使用率",
    dataIndex: '2',
    key: "2"
}, {
    title: "日间空闲率",
    dataIndex: '3',
    key: "3"
}, {
    title: "夜间空闲率",
    dataIndex: '4',
    key: "4"
}, {
    title: "物料",
    dataIndex: '5',
    key: "5"
}, {
    title: "吊绳倍率",
    dataIndex: '6',
    key: "6"
}, {
    title: "司机",
    dataIndex: '7',
    key: "7"
}, {
    title: "报价状态",
    dataIndex: '8',
    key: "8"
}]

export default function () {
    const [list, setList] = useState([]);
    const paginationProps = {
        pageSize: 10,
        current: 1,
        total: 1,
        // onChange: (c) => { setCurrent(c); }
    }
    return <div className={style.part}>
        <Table columns={colums} bordered dataSource={list} rowKey="id" pagination={paginationProps}></Table>
    </div>
}
import React, { useState, useEffect } from 'react';
import { Tree, message, Modal } from 'antd';
import axios from 'axios';

const { confirm } = Modal;

const convertToTreeData = (data, pid) => {
    const res = [];
    let temp = [];
    data.forEach(item => {
        if (item.pid === pid) {
            const obj = { ...item, title: item.mc, key: item.xmid };
            temp = convertToTreeData(data, item.id);
            if (temp.length > 0) {
                obj.children = temp;
            }
            res.push(obj);
        }
    })
    return res;
}
export default function Index({ xmList, onSelect, draggable = false,dragCallBack }) {
    const [treeNode, setTreeNode] = useState([]);
    useEffect(() => {
        if (xmList) {
            const treeData = convertToTreeData(xmList, null);
            setTreeNode(treeData);
        }
    }, [xmList])

    const onDrop = info => {
        console.log(info);
        const { node, dragNode } = info;
        if (node.statusStr === '2') {
            confirm({
                title: '提示',
                content: `请确认是否要调整？`,
                async onOk() {
                    const params = {
                        id: dragNode.id,
                        pid: node.id
                    };
                    await axios.post('xmxx/updateXmxx', params);
                    dragCallBack && dragCallBack();
                }
            })
        } else {
            message.error('只能移动到集团节点下');
        }
    };

    return (
        <Tree
            treeData={treeNode}
            onSelect={onSelect}
            draggable={draggable}
            onDrop={onDrop} />
    )
}
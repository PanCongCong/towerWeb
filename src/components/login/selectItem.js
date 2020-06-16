import React, { useState, useEffect } from 'react';
import { Modal, Select, Button } from 'antd';

import { getItem } from './../../tools/baseTool';

import logo from './../../imgs/logo.png';
import style from './index.module.less';

const defCompany = { id: 1, name: '中国建筑第三工程局有限公司' };
const defBranch = { id: 1, name: '中建三局南方公司' };

export default function ({ show, closeFn, loggedFn, refersh }) {

    const [company, setCompany] = useState(1);//公司
    const [branch, setBranch] = useState(1);// 分公司
    const [dep, setDep] = useState();// 经理部
    const [pro, setPro] = useState();// 项目


    const [companys, setCompanys] = useState([]);
    const [branchs, setBranchs] = useState([]);
    const [deps, setDeps] = useState([]);
    const [pros, setPros] = useState([]);

    const useInfo = getItem('userInfo');
    const { departmentInfos = [] } = useInfo || {};

    useEffect(() => {
        setCompanys([defCompany]);
    }, []);

    useEffect(() => {
        setBranchs([defBranch]);
    }, [company]);

    useEffect(() => {
        setDep(undefined);
        setDeps(departmentInfos.map(item => {
            return {
                id: item.departmentId,
                name: item.departmentName
            }
        }))
    }, [branch, refersh]);

    useEffect(() => {
        setPro(undefined);
        departmentInfos.some(depItem => {
            if (depItem.departmentId === dep) {
                const managDepartmentInfos = depItem.managDepartmentInfos || [];
                setPros(managDepartmentInfos.map(item => {
                    return {
                        id: item.xmid,
                        name: item.xmidName
                    }
                }))
            }
        })
    }, [dep, refersh]);

    const handleLogin = () => {
        let selectDep, selectPro;
        if (dep) {
            departmentInfos.some(depItem => {
                if (depItem.departmentId === dep) {
                    selectDep = depItem;
                    if (pro) {
                        const managDepartmentInfos = depItem.managDepartmentInfos || [];
                        managDepartmentInfos.some(item => {
                            if (item.xmid === pro) {
                                selectPro = item;
                                return true;
                            }
                        })
                    }
                    return true;
                }
            })
        }
        loggedFn && loggedFn({ company: defCompany, branch: defBranch, dep: selectDep, pro: selectPro });
    }


    return <Modal visible={show} onCancel={closeFn} footer={null}>
        <div className={style.proWrap}>
            <img src={logo} alt='中国建筑' className={style.logo} />
            <p>
                根据您账号的权限，可以选择所属的层级进入系统。
            </p>
            <small>(根据选择的等级不同进入不同的系统的等级)</small>
            <div className={style.selectGroup}>
                <Select placeholder="请选择集团" size="large" value={company} onSelect={(val) => { setCompany(val); }}>
                    {
                        companys.map(item => <Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>)
                    }
                </Select>
                <Select placeholder="请选择分公司" size="large" value={branch} onSelect={(val) => { setBranch(val); }} disabled={company === undefined}>
                    {
                        branchs.map(item => <Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>)
                    }
                </Select>
                <Select placeholder="请选择经理部" value={dep} size="large" onSelect={(val, e) => { setDep(val); console.log(val, e) }} disabled={branch === undefined}>
                    {
                        deps.map(item => <Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>)
                    }
                </Select>
                <Select placeholder="请选择项目" value={pro} size="large" onSelect={(val) => { setPro(val); }} disabled={dep === undefined}>
                    {
                        pros.map(item => <Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>)
                    }
                </Select>
            </div>
            <Button onClick={handleLogin} type="primary" block>进入</Button>
        </div>
    </Modal>
}
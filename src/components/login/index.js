import React, { useState, useEffect, useReducer } from 'react';
import { Form, Input, Button, Tabs, message } from 'antd';
import axios from 'axios';
import { UserOutlined, LockOutlined, PhoneOutlined, NumberOutlined } from '@ant-design/icons';
import { createHashHistory } from 'history';

import { setItem } from './../../tools/baseTool';

import SelectItem from './selectItem';
import style from './index.module.less';
import logo from './../../imgs/logo.png';
import bg from './../../imgs/login.png';

let history = createHashHistory();

const { TabPane } = Tabs;
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};
const Index = () => {
    const [show, setShow] = useState(false);
    const [form] = Form.useForm();
    const [refersh, dispatch] = useReducer((count) => { return count + 1 }, 0)

    useEffect(() => {
        form.setFieldsValue({ username: '15623028438', pwd: '123456' });
    }, [form])

    const onFinish = values => {
        axios.post('appTower/userLogin', {
            phone: values.username,
            passWord: values.pwd
        }).then(res => {
            const { data = {}, status, msg } = res;
            if (status !== 200) {
                message.error(msg || '用户名密码错误');
                return;
            }
            setItem('userInfo', data);
            dispatch();
            setShow(true);
        })
    };

    const logged = (params) => {
        const { branch, dep, pro } = params;
        console.log(params);
        // company branch 肯定是选择了的
        if (!dep) {
            // 进入分公司级别
            history.push('/frame/branchBI');
            setItem('loginInfo', { type: 'branch', data: params });
            return;
        }
        if (!pro) {
            // 进入经理部级别
            history.push('/frame/depBI');
            setItem('loginInfo', { type: 'dep', data: params });
            return;
        }
        // 进入项目级别
        history.push('/frame/proBI');
        setItem('loginInfo', { type: 'pro', data: params });
        return;
    }
    return (
        <div className={style.container} form={form}>
            <div className={style.top}>
                <img src={logo} className={style.logo} alt="中国建筑" />
            </div>
            <div className={style.content}>
                <img src={bg} alt="背景图" />
                <div className={style.formWrap}>
                    <h1>建筑工程安全在线监控系统</h1>
                    <Form name="login" form={form} onFinish={onFinish}>
                        <Tabs defaultActiveKey="1">
                            <TabPane tab="账户密码登录" key="1">
                                <Form.Item name="username" rules={[{ required: true, message: '请输入用户名' }]}>
                                    <Input prefix={<UserOutlined />} placeholder="用户名" size="large" />
                                </Form.Item>
                                <Form.Item name="pwd" rules={[{ required: true, message: '请输入密码' }]}>
                                    <Input.Password prefix={<LockOutlined />} placeholder="密码" size="large" />
                                </Form.Item>
                            </TabPane>
                            <TabPane tab="手机号登录" key="2">
                                <Form.Item name="phone" rules={[{ required: true, message: '请输入手机号' }]}>
                                    <Input prefix={<PhoneOutlined />} placeholder="手机号" size="large" />
                                </Form.Item>
                                <Form.Item name="yzm" rules={[{ required: true, message: '请输入验证码' }]}>
                                    <Input prefix={<NumberOutlined />} placeholder="验证码" size="large" />
                                </Form.Item>
                            </TabPane>
                        </Tabs>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" block>登录</Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
            <div className={style.footer}>
                <div className={style.fotterGroup}>
                    <a href="/#/login">帮助</a>
                    <a href="/#/login">隐私</a>
                    <a href="/#/login">条款</a>
                </div>
                <p>
                    copyright@2020 武汉亿诺凌科科技有限公司出品
                </p>
            </div>

            <SelectItem show={show} closeFn={() => { setShow(false); }} loggedFn={logged} refersh={refersh} />
        </div>
    )
}

export default Index;
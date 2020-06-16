/*
 * @Author: your name
 * @Date: 2020-05-07 16:21:20
 * @LastEditTime: 2020-05-07 16:21:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \gms-web\src\util\baseUtil.js
 */

export function getItem(key) {
    let val = localStorage.getItem(key);
    if (!val) {
        return val;
    }
    val = JSON.parse(val);
    if (Date.now() - val.time > val.expire) {
        localStorage.removeItem(key);
        return null;
    }
    return val.data;
}

export function setItem(key, value, expire) {
    let obj = {
        data: value,
        time: Date.now(),
        expire: expire || 365 * 24 * 60 * 60 * 1000
    };
    localStorage.setItem(key, JSON.stringify(obj));
}


export function getParamId() {
    const loginInfo = getItem('loginInfo');
    const { type, data: LoginData } = loginInfo;
    if (type === 'branch') return null
    if (type === 'dep') return LoginData.dep.departmentId
    if (type === 'pro') return LoginData.pro.xmid
}

export const mappingType = { 'branch': 1, 'dep': 2, 'pro': 3 };
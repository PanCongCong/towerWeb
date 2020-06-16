
import axios from 'axios';
import Qs from 'qs';
import { BASE_URL } from './../tools/constant';

export default function initAxios() {
    axios.defaults.transformRequest = [function (data) {
        return Qs.stringify(data);
    }];
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    // 添加响应拦截器
    axios.interceptors.response.use(function (response) {
        return response.data;
    }, function (error) {
        return error;
    });
    // 添加请求拦截器
    axios.interceptors.request.use(function (config) {
        /*添加请求地址*/
        if (config && config.url && (config.url.indexOf('http://') < 0 || config.url.indexOf('https://') < 0)) {
            config.url = BASE_URL + config.url;
        }
        return config;
    }, function (error) {
        // 对请求错误做些什么
        return Promise.reject(error);
    });
}


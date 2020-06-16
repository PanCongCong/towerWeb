import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useReq(opt, dep) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const request = async (source, didCancel) => {

        const { url, payload, method, callback } = opt;
        setLoading(true);
        let res;
        if (method === 'get') {
            res = await axios.get(url, { params: payload, cancelToken: source ? source.token : null })
        } else {
            res = await axios.post(url, payload);
        }
        if (didCancel) return;
        const { data, status } = res || {};
        setLoading(false);
        if (status !== 200) { setIsError(true); return };
        setData(data);

        callback && callback();
    };

    useEffect(() => {
        let didCancel = false;
        const source = axios.CancelToken.source();
        if (dep) {
            request(source, didCancel);
        }

        return () => {
            // 取消掉还未执行完的get请求
            didCancel = true;
            source.cancel();
        }
    }, [dep, opt]);

    return [
        data, request, loading, isError
    ]
};
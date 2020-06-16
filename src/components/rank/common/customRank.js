import React, { useState, useEffect } from 'react';
import style from './../index.module.less';


export default function () {
    const [list, setList] = useState([]);

    useEffect(() => {
        setList([{ name: '中建三局南方公司', val: '56.72%' },
        { name: '中国建筑第二局有限公司', val: '56.42%' },
        { name: '中国建筑第一局有限公司', val: '51.33%' },
        { name: '中国建筑总局有限公司', val: '42.25%' },
        { name: '中建三局集团有限公司', val: '35.58%' },
        ])
    }, [])

    const handleMore = () => {

    }

    return <div className={style.part}>
        <ul className={style.customList}>
            {
                list.map(item => {
                    return <li><span>{item.name}</span><span className={style.val}>{item.val}</span></li>
                })
            }
        </ul>
        <p>友情提示</p>
        <span className={style.des}>
            中建三局南方公司对比前几日在使用率的排名名次上升超过50%。是由于其中项目的数据导致的，
            <a onClick={handleMore} href>点击查看更多处理</a>
        </span>
    </div>
}
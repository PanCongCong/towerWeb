import React, { useEffect, useState } from 'react';
import Hoc from './hoc';

let i = 0;
// 定义观察者类
function observer(callback) {
    this.update = function (context) {
        callback(context + '2');
    }
}
let ob;

function Index({ Subject }) {
    const [text, setText] = useState('');

    useEffect(() => {
        ob = new observer((txt) => {
            setText(txt);
        });
        // 将观察者类注入到监听清单中
        Subject.addObsever(ob);
        return () => {
            Subject.removeObsever(ob);
        }
    }, []);

    return <div>
        <button onClick={() => { Subject.notify(i++) }}>点我+1</button>
        <button onClick={() => { Subject.removeObsever(ob); }}>点我移除监听</button>
        {text}
    </div>
}
export default Hoc(Index);
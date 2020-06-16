import React, { useEffect, useState } from 'react';
import Hoc from './hoc';

let i = 0;
// 定义观察者类
function observer(callback) {
    this.update = function (context) {
        callback(context + '1');
    }
}

function Index({ Subject }) {
    const [text, setText] = useState('');
    const [ob, setOb] = useState(null);

    useEffect(() => {
        setOb(new observer((txt) => {
            setText(txt);
        }));
    }, []);

    useEffect(() => {
        if (ob === null) return;
        Subject.addObsever(ob);
        return () => {
            Subject.removeObsever(ob);
        }
    }, [ob, Subject]);

    return <div>
        <button onClick={() => { Subject.notify(i++) }}>点我+1</button>
        <button onClick={() => { Subject.removeObsever(ob); }}>点我移除监听</button>
        {text}
    </div>
}
export default Hoc(Index);
import React, { useState, useEffect } from 'react';

let count = 0;
export default function () {
    // const [count, setCount] = useState(0);

    const click = () => {
        setTimeout(() => {
            console.log(count);
        }, 1000);
    }
    useEffect(() => {
        setTimeout(() => {
            console.log(1);
        }, 1000);

        Promise.resolve(() => { console.log(2) });
        // 以上等价为以下结果
        new Promise(resolve => resolve(() => { console.log(2) }))

        new Promise(function (resolve) {
            console.log(3);
            resolve();
            console.log(6);
        }).then(() => {
            console.log(4)
        })

        console.log(5);
    }, [])


    return <div>
        <span>{count}</span>
        <button onClick={() => { count++ }}>addcount</button>
        <button onClick={click}>print count</button>
    </div>
}
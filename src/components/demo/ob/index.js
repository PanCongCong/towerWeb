import React from 'react';
import Ob1 from './ob1';
import Ob2 from './ob2';
import Ob3 from './ob3';

class demo {
    constructor(name) {
        this.name = name || 'pan';
    }
    getName() {
        console.log(this.name);
    }
}

const a = new demo('张三');
const b = new demo();
a.getName();
b.getName();
const c={};
console.log(c);

console.log(demo.constructor.prototype);
// console.log(a.__proto__ === b.__proto__);
// console.log(a.constructor.prototype === a.__proto__);

export default function () {
    return <div>
        {/* <Ob1 />
        <Ob2 />
        <Ob3 /> */}
    </div>
}
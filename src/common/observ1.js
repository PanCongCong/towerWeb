
// Subject 被观察者，发布者；observer 观察者，订阅者
// 目标者对象，添加、删除、通知观察者改变三个方法

class Subject {
    constructor() {
        this.observers = [];
    }
    addObsever(observer) {
        this.observers.push(observer);
    }
    removeObsever(observer) {
        this.observers.some((item, idx) => {
            if (item === observer) this.observers.splice(idx, 1);
        })
    }
    notify(context) {
        this.observers.forEach(item => {
            item.update && item.update(context);
        })
    }
}

export {
    Subject
}


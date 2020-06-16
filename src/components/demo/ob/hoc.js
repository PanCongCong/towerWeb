import React from 'react';
import { Subject } from './../../../common/observ1';

// 定义目标对象
const mySubJect = new Subject();
export default function withSubscription(WrappedComponent) {
    return class extends React.Component {
        render() {
            return <WrappedComponent {...this.props} Subject={mySubJect} />;
        }
    };
}


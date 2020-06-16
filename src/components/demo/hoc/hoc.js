import React from 'react';
import axios from 'axios';

// 此函数接收一个组件...
export default function withSubscription(WrappedComponent, selectData) {
    // ...并返回另一个组件...
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                data: []
            };
        }

        componentDidMount() {
            // ...负责订阅相关的操作...
            axios.get('xmxx/selectXmxxList').then(res => {
                this.setState({ data: res.data });
            })
        }

        handleChange = () => {
            this.setState({ data: [{ xmid: '0001', mc: '这是测试' }] })
        }

        render() {
            // ... 并使用新数据渲染被包装的组件!
            // 请注意，我们可能还会传递其他属性
            return <WrappedComponent data={this.state.data} {...this.props} handleChange={this.handleChange} />;
        }
    };
}
import React from 'react';
import { Spin } from 'antd';

class Index extends React.Component {
    render() {
        return <div className="loading">
            <Spin />
        </div>
    }
}

export default Index;
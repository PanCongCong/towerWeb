import React from 'react';
import withSubscription from './hoc';

class Index extends React.Component {
    render() {
        const { data } = this.props;
        console.log(data);
        return <div>
            {
                data.map(item => { return <div key={item.xmid}>{item.mc}</div> })
            }
        </div>
    }
}

export default withSubscription(Index);
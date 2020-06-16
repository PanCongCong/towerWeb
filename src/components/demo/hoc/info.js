import React from 'react';
import withSubscription from './hoc';

class Index extends React.Component {
    render() {
        const { data = [], handleChange } = this.props;
        const [first = {}] = data;
        return <div>
            <button onClick={handleChange}>点我</button>
            {first.mc}
        </div>
    }
}

export default withSubscription(Index);
import React from 'react';

export class AppLayout extends React.Component {

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }

}

AppLayout.propTypes = {
    children: React.PropTypes.node
};

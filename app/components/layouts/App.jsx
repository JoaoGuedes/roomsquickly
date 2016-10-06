import React from 'react';
import Navbar from '../Navbar.jsx';

export const AppLayout = (props) => {

    AppLayout.propTypes = {
        children: React.PropTypes.node
    };

    return (
        <div>
            <Navbar/>
            {props.children}
        </div>
    );
};

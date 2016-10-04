import React from 'react';
import Navbar from './Navbar.jsx';

export const AppLayout = (props) => {

    return (
        <div className="container-fluid">
            <Navbar/>
            {props.children}
        </div>
    );
};

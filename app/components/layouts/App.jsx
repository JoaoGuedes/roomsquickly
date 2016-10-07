import React from 'react';
import Navbar from '../Navbar.jsx';
import Footer from '../Footer.jsx';

export const AppLayout = (props) => {

    AppLayout.propTypes = {
        children: React.PropTypes.node
    };

    return (
        <div>
            <Navbar/>
            {props.children}
            <Footer/>
        </div>
    );
};

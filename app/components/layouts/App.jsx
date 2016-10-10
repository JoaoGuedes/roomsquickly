import React from 'react';
import Navigation from '../Navigation.jsx';
import Footer from '../Footer.jsx';

export const AppLayout = (props) => {
    return (
        <div className="container-custom">
            <Navigation/>
            {props.children}
            <Footer/>
        </div>
    );
};

AppLayout.propTypes = {
    children: React.PropTypes.node
};

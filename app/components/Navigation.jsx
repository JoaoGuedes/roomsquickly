import React from 'react';
import { Link } from 'react-router';

const Navigation = (props) => {
    return (
        <nav className="navbar navbar-inverse" role="navigation">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <Link to="/" className="navbar-brand">RoomsQuickly</Link>
                </div>
        </nav>
    );
};

export default Navigation;

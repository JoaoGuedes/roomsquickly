import React from 'react';

const Navbar = (props) => {
    return (
        <nav className="navbar navbar-default" role="navigation">
            <div className="container-fluid">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <a className="navbar-brand" href="#">RoomsQuickly</a>
                </div>
                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul className="nav navbar-nav">
                        <li className="active"><a href="#">Link</a></li>
                    </ul>
                    <form className="navbar-form navbar-right" role="search">
                        <div className="form-search search-only">
                            <i className="search-icon glyphicon glyphicon-search"></i>
                            <input type="text" className="form-control search-query"/>
                        </div>
                    </form>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

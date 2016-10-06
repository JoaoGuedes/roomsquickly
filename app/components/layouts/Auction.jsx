import React from 'react';
import { Link } from 'react-router';
import Jumbo from '../Jumbo.jsx';

export default class AuctionLayout extends React.Component {

    render() {
        const state = this.props.routes[this.props.routes.length-1].path;
        return (
            <div>
                <Jumbo/>
                <div className="container">
                    <div className="row padded">
                        <div className="col-sm-12">
                            <ul className="nav nav-pills">
                                <li role="presentation" className={ state === 'all' ? 'active' : '' }>
                                    <Link to="/rooms/all">All</Link>
                                </li>
                                <li role="presentation" className={ state === 'active' ? 'active' : '' }>
                                    <Link to="/rooms/active">Active</Link>
                                </li>
                                <li role="presentation" className={ state === 'ended' ? 'active' : '' }>
                                    <Link to="/rooms/ended">Ended</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    { this.props.children }
                </div>
            </div>
        );
    }
};

AuctionLayout.propTypes = {
    children: React.PropTypes.node
};

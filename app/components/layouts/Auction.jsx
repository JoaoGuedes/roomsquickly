import React from 'react';
import { Link } from 'react-router';
import Jumbo from '../Jumbo.jsx';

const AuctionLayout = React.createClass({

    propTypes: {
        children: React.PropTypes.node
    },

    childContextTypes: {
        setActiveTab: React.PropTypes.func
    },

    getInitialState() {
        return {
            activeTab: 'all'
        };
    },

    setActiveTab(tab) {
        this.setState({
            activeTab: tab
        });
    },

    getChildContext() {
        return {
            setActiveTab: this.setActiveTab
        };
    },

    render() {
        return (
            <div>
                <Jumbo/>
                <div className="container">
                    <div className="row padded">
                        <div className="col-sm-12">
                            <ul className="nav nav-pills">
                                <li role="presentation" className={ this.state.activeTab === 'all' ? 'active' : '' }>
                                    <Link to="/rooms">All</Link>
                                </li>
                                <li role="presentation" className={ this.state.activeTab === 'active' ? 'active' : '' }>
                                    <Link to="/rooms/active">Active</Link>
                                </li>
                                <li role="presentation" className={ this.state.activeTab === 'ended' ? 'active' : '' }>
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
});

export default AuctionLayout;

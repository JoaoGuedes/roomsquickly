import React from 'react';
import { Link } from 'react-router';
import Jumbo from '../../Jumbo.jsx';

const AuctionListLayout = React.createClass({

    propTypes: {
        children: React.PropTypes.node
    },

    childContextTypes: {
        setActiveTab: React.PropTypes.func
    },

    getInitialState() {
        return {
            activeTab: 'active'
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
                <ol className="breadcrumb">
                    <li className="active"><Link to="/rooms">List</Link></li>
                </ol>
                <Jumbo/>
                <div className="container container-auction">
                    <div className="row padded">
                        <div className="col-sm-12">
                            <ul className="nav nav-pills">
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

export default AuctionListLayout;

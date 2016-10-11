import React from 'react';
import { Link } from 'react-router';
import { _fetch } from '../../helpers/api';
import Jumbo from '../../Jumbo.jsx';
import Empty from '../../EmptyList.jsx';
import ErrorLayout from '../Error.jsx';
import ActiveAuction from './ActiveAuction.jsx';
import EndedAuction from './EndedAuction.jsx';

/**
 * Layout components
 */
const Header = (props) => {

    let { data: { name , location, minimum_bid } } = props;
    return (
        <div className="row">
            <div className="col-sm-12">
                <div>
                    <h1>{ name }</h1>
                    <div>
                        <p><span className="glyphicon glyphicon-map-marker"></span> { location }</p>
                        <p><b>Minimum bid</b>: { minimum_bid } ฿</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

Header.propTypes = {
    data: React.PropTypes.object.isRequired
};

/**
 * Layouts
 */

const AuctionView = React.createClass({

    propTypes: {
        params: React.PropTypes.shape({
            id: React.PropTypes.string.isRequired
        })
    },

    componentDidMount() {
        this._getAuction();
    },

    getInitialState() {
        return {
            bids: [],
            highestBid: {}
        };
    },

    _getAuction() {
        const url = `/api/1/room/${this.props.params.id}`;
        _fetch(url)
            .then((data) => this.setState(data));
    },

    render() {
        let { name, image, active, error } = this.state;

        if (error) {
            return (
                <div>
                    <ol className="breadcrumb">
                        <li><Link to="/rooms">List</Link></li>
                    </ol>
                    <ErrorLayout error={error} />
                </div>
            );
        }

        return (
            <div>
                <ol className="breadcrumb">
                    <li><Link to="/rooms">List</Link></li>
                    <li className="active">{name}</li>
                </ol>
                <img src={ image } className="logo"/>
                <div className="container text-center">
                    <Header data={this.state}/>
                    { active ? <ActiveAuction data={this.state}/> : <EndedAuction data={this.state}/> }
                </div>
            </div>
        );
    }

});

export default AuctionView;

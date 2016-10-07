import React from 'react';
import { Link } from 'react-router';
import Jumbo from '../Jumbo.jsx';

const SingleAuctionLayout = React.createClass({

    getInitialState() {
        return {};
    },

    propTypes: {
        params: React.PropTypes.shape({
            id: React.PropTypes.string.isRequired
        })
    },

    _fetch() {
        const url = '/api/1';
        fetch(`${url}/room/${this.props.params.id}`)
            .then((data) => {
                return data.json();
            })
            .then((json) => {
                this.setState(json);
            })
            .catch((err) => console.log(err));
    },

    componentDidMount() {
        this._fetch();
    },

    render() {
        const { image, name } = this.state;
        return (
            <div>
                <ol className="breadcrumb">
                    <li><Link to="/rooms">List</Link></li>
                    <li className="active">{name}</li>
                </ol>
                <div>
                    <img src={ image }/>
                    <h1>{ name }</h1>
                </div>
            </div>
        );
    }
});

export default SingleAuctionLayout;

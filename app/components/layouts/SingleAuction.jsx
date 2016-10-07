import React from 'react';
import { Link } from 'react-router';
import Jumbo from '../Jumbo.jsx';
import Empty from '../EmptyList.jsx';

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
                if (data.status === 404) {
                    return { error: 404 };
                }
                return data.json();
            })
            .then((json) => {
                this.setState(json);
            })
            .catch((err) => console.log(err));
    },

    componentDidMount() {
        this._fetch();
        this._syncAuctionLoop = setInterval(this._fetch, 5000);
        this._updateTimeLoop = setInterval(() => {

            if (!this.state.active) {
                clearInterval(this._updateTimeLoop);
            }

            const now = new Date(Date.now() > this.state.end ? 0 : this.state.end - Date.now());
            const data = {
                ...this.state,
                remaining: {
                    minutes: `${now.getMinutes() < 10 ? 0 : ''}${now.getMinutes()}`,
                    seconds: `${now.getSeconds() < 10 ? 0 : ''}${now.getSeconds()}`
                }
            };
            this.setState(data);
        }, 500);
    },

    componentWillUnmount() {
        [this._syncAuctionLoop, this._updateTimeLoop].forEach((interval) => clearInterval(interval));
    },

    getInitialState() {
        return {};
    },

    render() {
        let { image, name, location } = this.state;

        if (this.state.error === 404) {
            return (<Empty/>);
        }

        return (
            <div>
                <ol className="breadcrumb">
                    <li><Link to="/rooms">List</Link></li>
                    <li className="active">{name}</li>
                </ol>
                <div>
                    <img src={ image }/>
                    <h1>{ name }</h1>
                    <small> { location }</small>
                    <h2>{ this.state && this.state.active ? `${ this.state.remaining.minutes }:${ this.state.remaining.seconds }` : '' }</h2>
                </div>
            </div>
        );
    }
});

export default SingleAuctionLayout;

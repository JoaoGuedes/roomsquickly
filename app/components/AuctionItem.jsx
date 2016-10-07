import React from 'react';

const AuctionItem = React.createClass({

    _update() {
        return setInterval(() => {
            const now = new Date(this.props.data.end - Date.now());
            this.setState({
                minutes: `${now.getMinutes() < 10 ? 0 : ''}${now.getMinutes()}`,
                seconds: `${now.getSeconds() < 10 ? 0 : ''}${now.getSeconds()}`
            });
        }, 500);
    },

    componentDidMount() {
        if (this.props.data.active) {
            this._interval = this._update();
        }
    },

    componentWillUnmount() {
        clearInterval(this._interval);
    },

    getInitialState() {
        return {
            minutes: this.props.data.remaining.minutes || 0,
            seconds: this.props.data.remaining.seconds || 0
        };
    },

    componentWillReceiveProps(nextProps) {
        this.setState({
            minutes: nextProps.data.remaining.minutes,
            seconds: nextProps.data.remaining.seconds
        });
    },

    render() {
        return (
            <div className="col-md-4">
                <div className="thumbnail">
                    <img className="img-rounded" src={this.props.data.image} />
                    <div className="caption text-center">
                        <h3>{this.props.data.name}</h3>
                        <p>{this.props.data.location}</p>
                        <p>{ `${this.state.minutes}:${this.state.seconds}`}</p>
                        <p><a href="#" className="btn btn-warning" role="button">Button</a> <a href="#" className="btn btn-default" role="button">Button</a></p>
                    </div>
                </div>
            </div>
        );
    }
});

export default AuctionItem;

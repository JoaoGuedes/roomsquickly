import React from 'react';

const Table = (props) => {

    let { data = [], winner = {}, active } = props;
    if (data.length > 0) {
        return (
            <div className="row" style={{ marginTop: '30px' }}>
                <div className="col-sm-12">
                    <div className="col-sm-4 col-center">
                        <div className="panel panel-info">
                            <div className="panel-heading">Bids</div>
                            <table className="table">
                                <tbody>
                                    { data
                                        .map((bid, index) => {
                                            if (bid.bid_id === winner.bid_id) {
                                                return (
                                                    <tr key={index} className="text-center active">
                                                        <td>
                                                            <span className="glyphicon glyphicon-star sunflower-dark"></span>
                                                             &nbsp; { parseFloat(bid.value).toFixed(3) } ฿
                                                        </td>
                                                    </tr>);
                                            }
                                            else {
                                                return (
                                                    <tr key={index} className="text-center">
                                                        <td>{ parseFloat(bid.value).toFixed(3) } ฿</td>
                                                    </tr>);
                                            }
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    if (!active) {
        return (
            <div className="alert alert-info">
              <strong>No winners!</strong>
            </div>
        );
    }

    return (<div></div>);
};

Table.propTypes = {
    data: React.PropTypes.array,
    active: React.PropTypes.bool,
    winner: React.PropTypes.object
};

const BidList = React.createClass({

    propTypes: {
        data: React.PropTypes.array,
        active: React.PropTypes.bool,
        winner: React.PropTypes.object
    },

    handleChange(event) {
        if (!event.target.value) {
            return this.setState({ data: this.props.data });
        }
        let newState = this.state.data.filter((item) => event.target.value === item.bid_id);
        this.setState({ data: newState });
    },

    getInitialState() {
        return {
            data: this.props.data
        };
    },

    componentWillReceiveProps(nextProps) {
        this.setState({
            data: nextProps.data
        });
    },

    render() {
        let { active, winner } = this.props;
        let { data } = this.state;
        return (
            <div>
                <input className="form-control" onChange={this.handleChange}/>            
                <Table data={data} active={active} winner={winner}/>
            </div>
        );
    }
});

export default BidList;

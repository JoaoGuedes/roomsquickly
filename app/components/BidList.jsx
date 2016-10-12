import React from 'react';

const Table = (props) => {

    let { data = [], winner = {}, filterBy = '', active } = props;

    if (data.length > 0) {
        return (
            <div className="col-sm-4 col-center">
                <div className="panel panel-info">
                    <div className="panel-heading">Bids</div>
                    <table className="table">
                        <tbody>
                            { data
                                .filter((bid) => {
                                    if (filterBy) {
                                        let [current, highest, filter] = [
                                            bid.bid_id.toUpperCase(),
                                            winner.bid_id.toUpperCase(),
                                            filterBy.toUpperCase()
                                        ];
                                        return current === highest && current === filter;
                                    }
                                    return true;
                                })
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
        );
    }
    return (
        <div className="col-sm-4 col-center">
            <div className="alert alert-info">
                <strong>{ active ? 'No bids' : 'No winners'}</strong>
            </div>
        </div>
    );
};

Table.propTypes = {
    filterBy: React.PropTypes.string,
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
        this.setState({
            filter: event.target.value
        });
    },

    getInitialState() {
        return {
            filter: ''
        };
    },

    render() {
        let { active, winner } = this.props;
        let { filter } = this.state;
        return (
            <div className="row" style={{ marginTop: '30px' }}>
                <div className="col-sm-12">

                    { !active && winner.bid_id ?
                        <div className="col-sm-4 col-center" style={{ marginBottom: '20px' }}>
                            <div className="form-search search-only">
                                <i className="search-icon glyphicon glyphicon-search"></i>
                                <input type="text"
                                    placeholder="Search by winning bid_id"
                                    className="form-control search-query"
                                    onChange={this.handleChange}/>
                            </div>
                        </div> : ''
                    }

                    <Table {...this.props} filterBy={ filter }/>
                </div>
            </div>
        );
    }
});

export default BidList;

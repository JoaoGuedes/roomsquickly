import React from 'react';

const BidList = (props) => {

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

BidList.propTypes = {
    data: React.PropTypes.array,
    active: React.PropTypes.bool,
    winner: React.PropTypes.object
};

export default BidList;

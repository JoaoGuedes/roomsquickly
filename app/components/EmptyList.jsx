import React from 'react';

const EmptyList = (props) => {
    return (
        <div className="alert alert-warning alert-dismissable">
            <button type="button" className="close" data-dismiss="alert" aria-hidden="true">×</button>
            <strong>No auctions found!</strong>
        </div>
    );
};

export default EmptyList;

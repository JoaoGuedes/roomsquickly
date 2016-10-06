import React from 'react';

const Auction = (props) => {
    return (
        <div className="col-md-4">
            <div className="thumbnail">
                <img className="img-rounded" src="img/thumbnail-1.jpg" />
                <div className="caption text-center">
                    <h3>Thumbnail label</h3>
                    <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id ...</p>
                    <p><a href="#" className="btn btn-warning" role="button">Button</a> <a href="#" className="btn btn-default" role="button">Button</a></p>
                </div>
            </div>
        </div>
    );
};

export default Auction;

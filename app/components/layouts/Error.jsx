import React from 'react';
import { Link } from 'react-router';

const ErrorLayout = (props) => {

    let { error } = props;

    return (
        <div>
            <ol className="breadcrumb">
                <li><Link to="/rooms">List</Link></li>
            </ol>
            <div className="container pad">
                <div className="row">
                    <div className="col-sm-8 col-center">
                        <div className="alert alert-danger">
                            <h4>Something went wrong!</h4>
                            <p>{ error }</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

ErrorLayout.propTypes = {
    error: React.PropTypes.string
};

export default ErrorLayout;

import React from 'react';
import { Link } from 'react-router';

const ErrorLayout = (props) => {

    let { error } = props;

    return (
        <div>
            <div className="container pad">
                <div className="row">
                    <div className="col-sm-8 col-center">
                        <div className="alert alert-danger">
                            <h4>Something went wrong!</h4>
                            <p>{ error.message }</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

ErrorLayout.propTypes = {
    error: React.PropTypes.object
};

export default ErrorLayout;

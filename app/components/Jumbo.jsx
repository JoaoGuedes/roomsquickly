import React from 'react';

const Jumbo = (props) => {
    return (
        <div className="jumbotron">
            <div className="jumbotron-photo">
                <img src="img/Jumbotron.jpg"/>
            </div>
            <div className="jumbotron-contents">
                <h1>Implementing the HTML and CSS into your user interface project</h1>
                <h2>HTML Structure</h2>
                <p>This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
                <h2>CSS Structure</h2>
                <p>This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
            </div>
        </div>
    );
};

export default Jumbo;

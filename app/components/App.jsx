import React from 'react';
import Navbar from './Navbar.jsx';

const Jumbotron = (props) => {
    return (
        <div className="jumbotron">
              <div className="jumbotron-photo"><img src="img/Jumbotron.jpg"/></div>
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

const Thumbs = (props) => {
    return (
        <div className="container">
        <div className="col-sm-12">
        <div className="row">
                    <div className="col-sm-6 col-md-3">
                      <div className="thumbnail">
                        <img className="img-rounded" src="img/thumbnail-1.jpg" />
                        <div className="caption text-center">
                          <h3>Thumbnail label</h3>
                          <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id ...</p>
                          <p><a href="#" className="btn btn-warning" role="button">Button</a> <a href="#" className="btn btn-default" role="button">Button</a></p>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6 col-md-3">
                      <div className="thumbnail">
                        <img className="img-rounded" src="img/thumbnail-2.jpg"/>
                        <div className="caption text-center">
                          <h3>Thumbnail label</h3>
                          <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id ...</p>
                          <p><a href="#" className="btn btn-warning" role="button">Button</a> <a href="#" className="btn btn-default" role="button">Button</a></p>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6 col-md-3">
                      <div className="thumbnail">
                        <img className="img-rounded" src="img/thumbnail-3.jpg"/>
                        <div className="caption text-center">
                          <h3>Thumbnail label</h3>
                          <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id ...</p>
                          <p><a href="#" className="btn btn-warning" role="button">Button</a> <a href="#" className="btn btn-default" role="button">Button</a></p>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6 col-md-3">
                      <div className="thumbnail">
                        <img className="img-rounded" src="img/thumbnail-4.jpg"/>
                        <div className="caption text-center">
                          <h3>Thumbnail label</h3>
                          <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id ...</p>
                          <p><a href="#" className="btn btn-warning" role="button">Button</a> <a href="#" className="btn btn-default" role="button">Button</a></p>
                        </div>
                      </div>
                    </div>
                  </div>
                  </div>
                  </div>
    );
};

export const AppLayout = (props) => {

    return (
        <div>
            <Navbar/>
            <Jumbotron/>
            <Thumbs/>
            {props.children}
        </div>
    );
};

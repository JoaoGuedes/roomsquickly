import { render } from 'react-dom';
import React from 'react';
import CustomRouter from 'router.jsx';
import 'imports?jQuery=bootflat/js/jquery-1.10.1.min!bootflat/js/bootstrap.min';
import 'css/styles.scss';
import 'index.html';

render(<CustomRouter/>, document.getElementById('app'));

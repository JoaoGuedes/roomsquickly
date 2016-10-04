import { render } from 'react-dom';
import React from 'react';
import Routes from 'routes.jsx';
import 'css/styles.scss';
import 'whatwg-fetch';
import 'index.html';

render(<Routes/>, document.getElementById('app'));

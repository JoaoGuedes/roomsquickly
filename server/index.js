import express from 'express';
import nconf from 'nconf';
import routes from './api';
import morgan from 'morgan';

const app = express();

nconf.file('./server/config.json');

app.use(morgan('dev'));
app.use('/api', routes);

//Start server
app.listen(3000);

console.log('Listening on port 3000');

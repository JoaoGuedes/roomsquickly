import express from 'express';
import nconf from 'nconf';
import morgan from 'morgan';

const app = express();

nconf.file('./server/config.json');

app.use(morgan('dev'));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
app.use('/api', require('./api').default);

//Start server
app.listen(3000);

console.log('Listening on port 3000');

import Router from 'express';
import v1 from './1';

export default Router({ mergeParams: true })
    .use('/1', v1);

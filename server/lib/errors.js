import ExtendableError from 'es6-error';

export default class HTTPError extends ExtendableError {

    BadRequest() {
        this.status = 400;
        return this;
    }

    NotFound() {
        this.status = 404;
        return this;
    }
}

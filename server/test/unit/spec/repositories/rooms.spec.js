import test from 'tape-catch';
import nconf from 'nconf';
import seed from '~/test/unit/fixtures/rooms';
import Repository from '~/repositories/rooms';
import HTTPError from '~/lib/errors';

let repo;

const before = () => {
    nconf.file('./server/config.json');
};

const beforeEach = () => {
    repo = new Repository({ seed });
};

before();

test('Repository.create', (t) => {
    beforeEach();
    t.plan(1);
    repo.create({
        start: Date.now() - 10000
    })
    .then(() => t.fail())
    .catch((err) => t.true(err instanceof HTTPError, 'should fail because auction was created in the past'))
    ;
});

test('Repository.create', (t) => {
    beforeEach();
    t.plan(1);
    repo.create({
        end: Date.now() - 10000
    })
    .then(() => t.fail())
    .catch((err) => { console.log(err.message); t.true(err instanceof HTTPError, 'should fail because auction end date is before start date')})
    ;
});

import Router from 'express';

import seed from '~/test/unit/fixtures/rooms';
import RoomsInteractor from '~/interactors/rooms';
import RoomsRepository from '~/repositories/rooms';
import RoomsPresenter from '~/presenters/rooms';

const interactor = new RoomsInteractor({
    repository: new RoomsRepository({ seed }),
    presenter: new RoomsPresenter()
});

interactor.create([
    {
        name: 'Lounge',
        image: 'https://a2.muscache.com/im/pictures/7f9e0bc8-f374-46f8-a7b0-8c99342bd19b.jpg?aki_policy=xx_large',
        location: 'Porto, Portugal',
        minimum_bid: 10,
        start: Date.now(),
        end: Date.now() + 1000*60*0.5
    },
    {
        name: 'Presidential suite',
        image: 'https://a0.muscache.com/im/pictures/23832986/868a53b8_original.jpg?aki_policy=xx_large',
        location: 'Lisbon, Portugal',
        minimum_bid: 100,
        start: Date.now() + 1000
    }
]);

export default Router({ mergeParams: true })
    .get('/rooms', (req, res, next) => {
        interactor.getAll()
            .then((rooms) => res.status(200).json(rooms))
            .catch((err) => next(err));
    })
    .get('/rooms/active', (req, res, next) => {
        interactor.getActive()
            .then((rooms) => res.status(200).json(rooms))
            .catch((err) => next(err));
    })
    .get('/rooms/ended', (req, res, next) => {
        interactor.getEnded()
            .then((rooms) => res.status(200).json(rooms))
            .catch((err) => next(err));
    })
    .post('/room/:id/bid', (req, res, next) => {
        const id = req.params.id,
            value = req.body.value;

        interactor.bid({ id, value })
            .then((bid) => res.status(200).json(bid))
            .catch((err) => next(err));
    })
    .get('/room/:id', (req, res, next) => {
        const id = req.params.id;
        interactor.getOne({ id })
            .then((room) => res.status(200).json(room))
            .catch((err) => next(err));
    });

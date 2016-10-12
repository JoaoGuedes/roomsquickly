import Router from 'express';

import { enrichAuctions } from '~/lib/utils';
import seed from '~/test/unit/fixtures/rooms';
import RoomsInteractor from '~/interactors/rooms';
import RoomsRepository from '~/repositories/rooms';
import RoomsPresenter from '~/presenters/rooms';

const interactor = new RoomsInteractor({
    repository: new RoomsRepository({ seed: enrichAuctions(seed) }),
    presenter: new RoomsPresenter()
});

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

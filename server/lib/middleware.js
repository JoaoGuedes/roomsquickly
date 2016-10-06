
export const errors = (err, req, res, next) => {
    res.status(err.status || 500).send(err.message);
};

const createError = require("http-errors");
const Response = require('../../src/output/Response')

const notFoundError = (request, response, next) => next(createError.NotFound());

const error = (err, req, res, next) => {
    res.status(err.status || 500);
    res.send(new Response(err.status || 500,err.message, null));
}

module.exports = {notFoundError, error};
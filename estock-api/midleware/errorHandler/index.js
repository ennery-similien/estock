const createError = require("http-errors");
const Response = require('../../src/output/Response')
const {CODE_ERROR} = require("../../utilities/constants");

const notFoundError = (request, response, next) => {
    next(createError.NotFound());
}

const error = (err, req, res, next) => {
    res.status(err.status || 500);
    res.send(new Response({
        code: err.code || 500,
        codeText: CODE_ERROR
    }, err.message, null));
}

module.exports = {notFoundError, error};
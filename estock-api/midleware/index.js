const Authentication = require("./role/Authentication");
const {notFoundError, error} = require("./errorHandler");


module.exports = {
    Authentication,
    notFoundError,
    error
}
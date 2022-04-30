const error401 = function (resource){
    let error = new Error(resource.concat(' not found '));
    error.status = 401;
    return error;
}

module.exports = {error401};
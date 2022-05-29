const JWT = require("jsonwebtoken")
const {TOKEN_SECRET_KEY} = process.env;
const {Role} = require("@prisma/client");

class Authentication {
    admin(request, response, callback)
    {
        const token = Authentication.#getToken(request)

        JWT.verify(token, TOKEN_SECRET_KEY, {},(error, decoded) => {
            if(error)
                callback(new Error("Internal error: " + error));

            if(decoded.role === Role.ADMIN)
                callback();
            else
                callback(new Error("[Permission Denied]: User does not have access"));
        });
    }

    seller(request, response, callback)
    {
        const token = Authentication.#getToken(request)

        JWT.verify(token, TOKEN_SECRET_KEY, {},(error, decoded) => {
            if(error)
                callback(new Error("Internal error: " + error));

            if(decoded.role === Role.SALESMAN)
                callback();
            else
                callback(new Error("[Permission Denied]: User does not have access"));
        });
    }

    static #getToken(request)
    {
        const token = request.headers.authorization;
        const user = request.user;

        if(!token) throw new Error("Can't get token");

        const splitedToken = token.split(" ");

        if(splitedToken[0] !== "Bearer") throw new Error("Invalid token");

        return splitedToken[1];
    }
}

module.exports = Authentication;
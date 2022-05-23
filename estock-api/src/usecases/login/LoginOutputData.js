const {ClassConverter} = require("../../domain/converter");

class LoginOutputData extends ClassConverter
{
    constructor(user) {
        super();
        this.id = user.id;
        this.login = user.niu;
        this.name = `${user.firstname} ${user.lastname}`;
        this.role = user.role;
        this.email = user.email;
        this.token = user.token;
        this.isOnline = user.isOnline;
    }
}

module.exports = LoginOutputData;
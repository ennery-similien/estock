const {ClassConverter} = require("../../converter");

class User extends ClassConverter
{
    constructor()
    {
        super();

        this.id = undefined;
        this.niu = null;
        this.firstname = null;
        this.lastname = null;
        this.birthday = null;
        this.email = null;
        this.password = null;
        this.role = null;
        this.isActive = false;
        this.isOnline = false;
        this.initDay = null;
        this.telephones = [];
        this.addresses = [];
        this.orders = [];
    }
}

module.exports = User;
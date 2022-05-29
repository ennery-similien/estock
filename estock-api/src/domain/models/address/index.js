const {ClassConverter} = require("../../converter");

class Address extends ClassConverter
{
    constructor()
    {
        super();

        this.id = undefined;
        this.address = null;
        this.zip = null;
        this.city = null;
        this.state = null;
        this.complement = null;
        this.type = null;
        this.owner = null;
        this.isPrimary = false;
    }
}

module.exports = Address;
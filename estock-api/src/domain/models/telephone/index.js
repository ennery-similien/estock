const {ClassConverter} = require("../../converter");

class Telephone extends ClassConverter
{
    constructor()
    {
        super();

        this.id = undefined;
        this.number = null;
        this.type = null;
        this.owner = null;
    }
}

module.exports = Telephone;
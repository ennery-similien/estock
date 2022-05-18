const {ClassConverter} = require("../../converter");

class Order extends ClassConverter
{
    constructor() {
        super();

        this.id = undefined;
        this.code = null;
        this.user = null;
        this.client = null;
        this.total = null;
        this.economy = null;
        this.status = null;
        this.items = []
    }
}

module.exports = Order;
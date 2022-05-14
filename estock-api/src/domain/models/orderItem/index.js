const {ClassConverter} = require("../../converter");

class OrderItem extends ClassConverter
{
    constructor() {
        super();

        this.id = undefined;
        this.productId = null;
        this.orderId = null;
        this.discount = null;
    }
}

module.exports = OrderItem;
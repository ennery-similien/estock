const {ClassConverter} = require("../../converter");

class OrderItem extends ClassConverter
{
    constructor() {
        super();
        this.orderId = undefined;
        this.productId = null;
        this.actualPrice = null;
        this.quantity = null;
        this.total = null;
        this.discount = null;
    }
}

module.exports = OrderItem;
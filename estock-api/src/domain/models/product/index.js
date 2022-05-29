const {ClassConverter} = require("../../converter");

class Product extends ClassConverter
{
    constructor() {
        super();

        this.id = undefined;
        this.barcode = null;
        this.title = null;
        this.description = null;
        this.category = null;
        this.subcategory = null;
        this.brand = null;
        this.model = null;
        this.stock = null;
        this.price = null;
        this.properties = [];
        this.images = [];
        this.isAvailable = true;
        this.orders = [];
    }
}

module.exports = Product;
const {validateData} = require("../../../utilities/validator");

class Validator {
    validate(product)
    {
        validateData(product.barcode, "Product barcode must not be empty or null");
        validateData(product.title, "Product title must not be empty or null");
        validateData(product.description, "Product description must not be empty or null");
        validateData(product.category, "Product category must not be empty or null");
        validateData(product.subcategory, "Product subcategory must not be empty or null");
        validateData(product.brand, "Product brand must not be empty or null");
        validateData(product.model, "Product model must not be empty or null");
        validateData(product.stock, "Product stock value must not be empty or null");
        validateData(product.price, "Product price must not be empty or null");
        validateData(product.isAvailable, "Product availability must not be empty or null");
        validateData(product.properties, "Product properties must not be null");
        validateData(product.images, "Product images must not be null");

        Validator.#validateStock(product);
        Validator.#validatePrice(product);
    }

    static #validateStock(product)
    {
        const stock = Number.parseInt(product.stock);

        if(isNaN(stock) || !Number.isInteger(stock))
            throw new Error("Product stock must be an integer");

        product.stock = stock;
    }

    static #validatePrice(product) {
        const price = Number.parseFloat(product.price);

        if (isNaN(price))
            throw new Error("Product price must be an float value");

        product.price = price;
    }
}

module.exports = Validator;
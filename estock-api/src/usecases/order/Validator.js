const {validateData} = require("../../../utilities/validator");
const {provider} = require("../../dataproviders");
const {OrderItem} = require("../../domain/models");

class Validator {
    async validate(order, isCreate) {
        if(isCreate)
            await Validator.#validateOrderItems(order);
        else
            await Validator.#validateOrderItemsUpdate(order);
    }

    static async #validateOrderItems(order) {
        if (!order.items || order.items.length <= 0) {
            order.items = [];
            order.total = 0.00;
            order.economy = 0.00;
            return;
        }
        Validator.#convertOrderItems(order);

        for (const [index, item] of order.items.entries())
            await Validator.#validateItemData(index, item)
    }

    static async #validateOrderItemsUpdate(order) {
        if (!order.items || order.items.length <= 0)
            throw new Error("Cannot update order items without product list");

        Validator.#convertOrderItems(order);

        for (const [index, item] of order.items.entries())
            await Validator.#validateItemData(index, item)
    }

    static #convertOrderItems(order) {

        order.items = order.items.map((item, index)=> {

            Validator.#validateItem(index, item);

            item.discount = item.discount ? item.discount : 0.00;

            if (item.total !== (item.quantity * item.actualPrice))
                item.total = (item.quantity * item.actualPrice);

            return new OrderItem().from(item);
        });
    }

    static #validateItem(index, item) {
        validateData(item.productId, `Item ${index + 1} have a null product id`);
        validateData(item.actualPrice, `Item ${index + 1} have a null price`);
        validateData(item.quantity, `Item ${index + 1} have a null quantity`);
        validateData(item.total, `Item ${index + 1} have a null total`);

        if (item.quantity <= 0)
            throw new Error(`Item ${index + 1} quantity must be greater than 0`);

        if (!Number.isInteger(item.quantity))
            throw new Error(`Item ${index + 1} quantity must be a number`);

        if (!Number.isInteger(item.productId))
            throw new Error(`Product ID of item ${index + 1} must be a number`);
    }

    static async #validateItemData(index, item)
    {
        const product = await provider.getProductById(item.productId);

        if (product === null)
            throw new Error(`Product of item ${index + 1} not found`);

        if (product.stock < item.quantity)
            throw new Error(`Item ${index + 1} quantity must not be greater than ${product.stock}`);
    }
}

module.exports = Validator;
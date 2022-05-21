const {orderDataProvider} = require("../../dataproviders");
const {isObjectEmpty} = require("../../../utilities");
const {exclude} = require("../../../database");
const Validator = require("./Validator");

class UpdateOrderAddProductUseCase {
    async process(orderId, inputData) {
        const excludeFilter = ["createdAt", "updatedAt", "user", "code", "client", "status"];
        const selectsOptions = {
            seller: {
                select: exclude("user", ["createdAt", "updatedAt", "password"])
            },
            items: {
                select: {
                    ...exclude("orderItem", []),
                    product: {
                        select: exclude("product", ["createdAt", "updatedAt"])
                    }
                }
            }
        };
        const id = Number.parseInt(orderId);

        UpdateOrderAddProductUseCase.#validateOrderId(id);

        const order = await orderDataProvider.getOrderById(id, excludeFilter, {});

        UpdateOrderAddProductUseCase.#validateOrderSetNewValue(order, inputData);
        await new Validator().validate(order);
        UpdateOrderAddProductUseCase.#setOrderTotalAndEconomy(order);

        return orderDataProvider.updateOrderAddProduct(order, ["createdAt", "updatedAt", "user"], selectsOptions);
    }

    static #validateOrderId(orderId) {
        if(isNaN(orderId))
            throw new Error("Order ID must be a number");
    }

    static #validateOrderSetNewValue(order, inputData)
    {
        if(order === null || isObjectEmpty(order))
            throw new Error("Order to update does not exist");

        order["items"] = inputData.items;

        return order;
    }

    static #setOrderTotalAndEconomy(order)
    {
        const totalAdnDiscount = order.items.reduce((previousItem, currentItem) => {
            return {
                total: previousItem.total + currentItem.total,
                discount: previousItem.discount + currentItem.discount
            }
        }, {total: 0.00, discount: 0.00});

        order.total += totalAdnDiscount.total;
        order.economy += totalAdnDiscount.discount;
    }

}

module.exports = UpdateOrderAddProductUseCase;
const {orderDataProvider} = require("../../dataproviders");
const {exclude} = require("../../../database");
const {isObjectEmpty} = require("../../../utilities");
const Validator = require("./Validator");

class UpdateOrderItemUseCase
{
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

        UpdateOrderItemUseCase.#validateOrderId(id);
        UpdateOrderItemUseCase.#validateOrderInputData(inputData);

        const order = await UpdateOrderItemUseCase.#getOrder(id, excludeFilter, inputData, exclude);

        UpdateOrderItemUseCase.#validateOrderSetNewValue(order, inputData);
        await new Validator().validate(order);
        UpdateOrderItemUseCase.#setOrderTotalAndEconomy(order);

        return orderDataProvider.updateOrderItems(order, ["createdAt", "updatedAt", "user"], selectsOptions);
    }

    static #validateOrderId(orderId) {
        if(isNaN(orderId))
            throw new Error("Order id must be a number");
    }

    static #validateOrderInputData(inputData) {
        if(isObjectEmpty(inputData))
            throw new Error("Cannot update order with empty input data");
    }

    static async #getOrder(orderId, excludeFilter, inputData, exclude) {
        return await orderDataProvider.getOrderById(orderId, excludeFilter, {
            items: {
                select: {
                    ...exclude("orderItem", []),
                },
                where: {
                    orderId: orderId,
                    productId: {
                        in: inputData.items.map(item => item.productId)
                    }
                }
            }
        });
    }

    static #validateOrderSetNewValue(order, inputData) {
        if(order === null || isObjectEmpty(order))
            throw new Error("Order to update does not exist");

        for (const item of order.items){
            order.total -= item.total;
            order.economy -= item.discount;
        }

        for( const item of order.items){
            const inputItem = inputData.items.find(input => item.productId === input.productId);

            if(inputItem.quantity >= 0)
                item.quantity = inputItem.quantity;

            if(inputItem.discount >= 0)
                item.discount = inputItem.discount;
        }
    }

    static #setOrderTotalAndEconomy(order)
    {
        for(const item of order.items){
            order.total += item.total;
            order.economy += item.discount;
        }
    }
}

module.exports = UpdateOrderItemUseCase;
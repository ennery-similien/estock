const {isObjectEmpty, objectKeyExits, isHumanName} = require("../../../utilities");
const {orderDataProvider} = require("../../dataproviders");
const {exclude} = require("../../../database");
const {validateData, validateNiu} = require("../../../utilities/validator");

class UpdateOrderByIdUseCase {

    async process(orderId, inputData) {
        const excludeFilter = ["code", "user", "total", "economy", "createdAt", "updatedAt"];
        const selectsOptions = {
            seller: {
                select: exclude("user", [...excludeFilter, "password"])
            },
            items: {
                select: {
                    ...exclude("orderItem", excludeFilter),
                    product: {
                        select: exclude("product", excludeFilter),
                    }
                }
            }
        }
        const id = Number.parseInt(orderId);

        UpdateOrderByIdUseCase.#validateId(id);
        UpdateOrderByIdUseCase.#validateData(inputData);

        const order = await orderDataProvider.getOrderById(id, excludeFilter, {});

        UpdateOrderByIdUseCase.#validateOrderSetNewValue(order, inputData);
        UpdateOrderByIdUseCase.#validateClient(order);

        return orderDataProvider.updateOrderById(order, ["createdAt", "updatedAt"], selectsOptions);
    }

    static #validateId(orderId)
    {
        if(isNaN(orderId))
            throw new Error("Order id must be a number");
    }

    static #validateData(data)
    {
        if(isObjectEmpty(data))
            throw new Error("Cannot update order with empty data");
    }

    static #validateOrderSetNewValue(order, inputData)
    {
        if(order === null || isObjectEmpty(order))
            throw new Error("Order to update does not exist");

        for(const [key, value] of Object.entries(inputData))
            if(objectKeyExits(order, key))
                order[key] =  value;

        return order;
    }

    static #validateClient(order)
    {
        if (order.client && !isObjectEmpty(order.client)) {
            validateData(order.client.name, "Client name must not be empty or null");

            if(!isHumanName(order.client.name))
                throw new Error("Client name must be a valid human name");

            if (order.client.niu) {
                try {
                    validateNiu(order.client.niu);
                } catch (error) {
                    if (error) throw new Error("Client niu must be a valid niu");
                }
            }
        }
        else
            order.client = {};

    }
}

module.exports = UpdateOrderByIdUseCase;
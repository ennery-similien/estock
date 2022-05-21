const {orderDataProvider} = require("../../dataproviders");
const {exclude} = require("../../../database");

class GetOrderByIdUseCase {
    process(orderId)
    {
        const excludeFilter = ["createdAt", "updatedAt", "user"];
        const selectsOptions = {
            seller:{
                select: exclude("user", [...excludeFilter, "password"])
            },
            items:{
                select:{
                    ...exclude("orderItem", excludeFilter),
                    product:{
                        select: exclude("product", excludeFilter),
                    }
                }
            }
        }
        const id = Number.parseInt(orderId);

        GetOrderByIdUseCase.#validateId(id);

        return orderDataProvider.getOrderById(id, excludeFilter, selectsOptions);
    }

    static #validateId(orderId)
    {
        if(isNaN(orderId))
            throw new Error("Order ID must be a number");
    }
}

module.exports = GetOrderByIdUseCase;
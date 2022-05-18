const {Order, OrderItem} = require("../../domain/models");
const {validateData, validateNiu} = require("../../../utilities/validator");
const {isObjectEmpty} = require("../../../utilities");
const {OrderStatus} = require("@prisma/client");
const {orderDataProvider, UserDataProvider} = require("../../dataproviders");

class CreateOrderUseCase
{
    async process(inputData)
    {
        const order = new Order().from(inputData);

        CreateOrderUseCase.#setOrderCode(order);
        await CreateOrderUseCase.#validateOrder(order);
        CreateOrderUseCase.#validateOrderItems(order);
        CreateOrderUseCase.#setOrderTotalAndEconomy(order, inputData);

        if(!order.status)
            order.status = OrderStatus.PENDING

        return orderDataProvider.createOrder(order, ["createdAt", "updatedAt"]);
    }

    static #setOrderCode(order) {
        if(!order.code)
            order.code = Date.now().toString();
    }

    static async #validateOrder(order) {
        validateData(order.code, "Error while generating order code");
        validateData(order.user, "User must not be empty or null");

        await CreateOrderUseCase.#validateSeller(order.user);

        if (order.client && !isObjectEmpty(order.client)) {
            validateData(order.client.name, "Client name must not be empty or null");
            if (order.client.niu)
                CreateOrderUseCase.#validateClientNiu(order.client.niu);
        }
        else
            order.client = {};
    }

    static async #validateSeller(userNiu) {
        try {
            validateNiu(userNiu);
        } catch (error) {
            if (error) throw new Error("Seller niu must be a valid niu");
        }

        if (!await UserDataProvider.userExists(userNiu))
            throw new Error("Order seller does not exist");
    }

    static #validateClientNiu(clientNiu)
    {
        try {
            validateNiu(clientNiu);
        }catch (error) {
            if(error) throw new Error("Client niu must be a valid niu");
        }
    }

    static #validateOrderItems(order)
    {
        if(!order.items || order.items.length <= 0)
        {
            order.items = [];
            order.total = 0.00;
            order.economy = 0.00;
            return;
        }
        CreateOrderUseCase.#convertOrderItems(order);
    }

    static #convertOrderItems(order) {
        order.items = order.items.map(item => {
            validateData(item.productId, "[Invalid Product]: Some items have a null product id");
            validateData(item.actualPrice, "[Invalid Product]: Some items have a null price");
            validateData(item.quantity, "[Invalid Value]: Some items have a null quantity");
            validateData(item.total, "[Invalid Product]: Some items have a null total");

            item.discount = item.discount ? item.discount : 0.00;

            if(item.total !== (item.quantity * item.actualPrice))
                item.total = (item.quantity * item.actualPrice);

            return new OrderItem().from(item);
        });
    }


    static #setOrderTotalAndEconomy(order, inputData)
    {
        if(!inputData.items || inputData.items.length <= 0)
            return;

        const totalAdnDiscount = order.items.reduce((previousItem, currentItem) => {
            return {
                total: previousItem.total + currentItem.total,
                discount: previousItem.discount + currentItem.discount
            }
        }, {total: 0.00, discount: 0.00});

        order.total = totalAdnDiscount.total;
        order.economy = totalAdnDiscount.discount;
    }

}

module.exports = CreateOrderUseCase;
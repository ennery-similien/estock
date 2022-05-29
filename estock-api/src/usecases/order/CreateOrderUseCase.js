const {Order} = require("../../domain/models");
const {validateData, validateNiu} = require("../../../utilities/validator");
const {OrderStatus} = require("@prisma/client");
const {orderDataProvider, UserDataProvider} = require("../../dataproviders");
const Validator = require("./Validator");
const {isObjectEmpty, isHumanName} = require("../../../utilities");

class CreateOrderUseCase
{
    async process(inputData)
    {
        const order = new Order().from(inputData);

        CreateOrderUseCase.#setOrderCode(order);
        await CreateOrderUseCase.#validateOrder(order);
        await new Validator().validate(order, true);
        CreateOrderUseCase.#setOrderTotalAndEconomy(order);

        if(!order.status)
            order.status = OrderStatus.PENDING

        return orderDataProvider.createOrder(order, ["createdAt", "updatedAt", "user"]);
    }

    static #setOrderCode(order) {
        if(!order.code)
            order.code = Date.now().toString();
    }

    static async #validateOrder(order) {
        validateData(order.code, "Error while generating order code");
        validateData(order.user, "User must not be empty or null");

        await CreateOrderUseCase.#validateSeller(order.user);

        CreateOrderUseCase.#validateClient(order)
    }

    static async #validateSeller(seller) {
        try {
            validateNiu(seller);
        } catch (error) {
            if (error) throw new Error("Seller niu must be a valid niu");
        }

        if (!await UserDataProvider.userExists(seller))
            throw new Error("Order seller does not exist");
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

    static #setOrderTotalAndEconomy(order)
    {
        if(!order.items || order.items.length <= 0)
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
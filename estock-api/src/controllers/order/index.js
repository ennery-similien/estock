const {
    CreateOrderUseCase,
    GetOrderByIdUseCase,
    GetAllOrderUseCase,
    UpdateOrderByIdUseCase,
    UpdateOrderAddProductUseCase,
    UpdateOrderRemoveProductUseCase,
    UpdateOrderItemUseCase,
} = require("../../usecases");
const Response = require("../../output/Response");
const {CODE_200, SUCCESS_MESSAGE, SINGLE_401_MESSAGE, MANY_401_MESSAGE} = require("../../../utilities/constants");
const {Error401} = require("../../../utilities/errorUtil");
const Index = require("../../../utilities/enumIndex");
const useCase = {
    create: new CreateOrderUseCase(),
    getById: new GetOrderByIdUseCase(),
    getAll: new GetAllOrderUseCase(),
    update: new UpdateOrderByIdUseCase(),
    updateAdd: new UpdateOrderAddProductUseCase(),
    updateRemove: new UpdateOrderRemoveProductUseCase(),
    updateItem: new UpdateOrderItemUseCase(),
};
class OrderController
{
    createOrder(request, response, next)
    {
        useCase.create.process(request.body)
            .then(order => {
                response.send(new Response(CODE_200, SUCCESS_MESSAGE("Create Order"), order));
            })
            .catch(error => { next(error); })
    }

    getOrderById(request, response, next)
    {
        const orderId = request.params.orderId;

        useCase.getById.process(orderId)
            .then(order => {
                response.send(new Response(
                    CODE_200,
                    order !== null ? SUCCESS_MESSAGE("Get order") : SINGLE_401_MESSAGE("Order"),
                    order));
            })
            .catch(error => { next(error); })
    }

    getAllOrder(request, response, next)
    {
        useCase.getAll.process(request.query)
            .then(orders => {response.send(
                new Response(CODE_200,
                    orders.length > 0 ? SUCCESS_MESSAGE("Get order") : MANY_401_MESSAGE("orders"),
                    orders));
            })
            .catch(error => { next(error); })
    }

    updateOrderById(request, response, next)
    {
        const orderId = request.params.orderId;
        const inputData = request.body;

        useCase.update.process(orderId, inputData)
            .then(order => {
                response.send(
                    new Response(CODE_200, SUCCESS_MESSAGE("Update order"), order)
                )
            })
            .catch(error => {
                if(error.meta?.target === Index.ORD_CODE_UNIQUE_INDEX)
                    next(new Error('Order code already exists'));
                else
                    error.code === 'P2025' ? next(Error401("Order to update")) : next(error);
            });
    }

    updateOrderAddProduct(request, response, next)
    {
        const orderId = request.params.orderId;
        const inputData = request.body;

        useCase.updateAdd.process(orderId, inputData)
            .then(order => {
                response.send(
                    new Response(CODE_200, SUCCESS_MESSAGE("Update order"), order)
                )
            })
            .catch(error => {
                error.code === 'P2025' ? next(Error401("Order to update")) : next(error);
            });
    }

    updateOrderRemoveProduct(request, response, next)
    {
        const orderId = request.params.orderId;
        const inputData = request.body;

        useCase.updateRemove.process(orderId, inputData)
            .then(order => {
                response.send(
                    new Response(CODE_200, SUCCESS_MESSAGE("Update order"), order)
                )
            })
            .catch(error => {
                error.code === 'P2025' ? next(Error401("Order to update")) : next(error);
            });
    }

    updateOrderItems(request, response, next)
    {
        useCase.updateItem.process(request.params.orderId, request.body)
            .then(order => {
                response.send(
                    new Response(CODE_200, SUCCESS_MESSAGE("Update order"), order)
                )
            })
            .catch(error => {
                console.log(error)
                error.code === 'P2025' ? next(Error401("Order to update")) : next(error);
            })
    }
}

module.exports = OrderController;
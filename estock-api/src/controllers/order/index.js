const {CreateOrderUseCase,} = require("../../usecases");
const Response = require("../../output/Response");
const {CODE_200, SUCCESS_MESSAGE} = require("../../../utilities/constants");
const useCase = {
    create: new CreateOrderUseCase(),
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
}

module.exports = OrderController;
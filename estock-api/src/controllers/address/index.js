const {
    CreateAddressUseCase,
    GetAddressByNiuUseCase,
    GetAllAddressUseCase,
    UpdateAddressByIdUseCase
} = require("../../usecases");
const Response = require("../../output/Response");
const {CODE_200, SUCCESS_MESSAGE, MANY_401_MESSAGE, SINGLE_401_MESSAGE} = require("../../../utilities/constants");


class AddressController
{
    static createAddress(request, response, next)
    {
        CreateAddressUseCase.process(request.body, next)
            .then(address => {
                response.send(new Response(CODE_200, SUCCESS_MESSAGE("Insert address"), address));
            })
            .catch (error => {
                next(error);
            });
    }

    static getAddressByNiu(request, response, next)
    {
        GetAddressByNiuUseCase.process(request.params.niu, request.query, next)
            .then(address => {
                if (address === null)
                    response.send(new Response(CODE_200, SINGLE_401_MESSAGE("Address"), address));
                else
                    response.send(new Response(CODE_200, SUCCESS_MESSAGE("Get address"), address));
            })
            .catch (error => { next(error); })
    }

    static getAll(request, response, next)
    {
        GetAllAddressUseCase.process(request.query)
            .then(addresses => {
                if(addresses.length > 0)
                    response.send(new Response(CODE_200, SUCCESS_MESSAGE("Get address"), addresses));
                else
                    response.send(new Response(CODE_200, MANY_401_MESSAGE("address"), addresses));
            })
            .catch (error => {
                next(error);
            });
    }

    static updateAddressById(request, response, next)
    {
        const addressId = request.params.addressId;
        const data = request.body;

        UpdateAddressByIdUseCase.process(addressId, data, next)
            .then(address => {
                response.send(new Response(CODE_200, SUCCESS_MESSAGE("Update address"), address));
            })
            .catch(error => { next(error)})
    }
}

module.exports = AddressController;
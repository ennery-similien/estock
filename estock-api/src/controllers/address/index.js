const {
    CreateAddressUseCase,
    GetAddressByOwnerUseCase,
    GetAllAddressUseCase,
    UpdateAddressByIdUseCase
} = require("../../usecases");
const Response = require("../../output/Response");
const {CODE_200, SUCCESS_MESSAGE, MANY_401_MESSAGE, SINGLE_401_MESSAGE} = require("../../../utilities/constants");
const {Error401} = require("../../../utilities/errorUtil");


class AddressController
{
    static createAddress(request, response, next)
    {
        CreateAddressUseCase.process(request.body)
            .then(address => {
                response.send(new Response(CODE_200, SUCCESS_MESSAGE("Insert address"), address));
            })
            .catch (error => {
                error.code === 'P2003' ?  next(Error401('Address owner')) : next(error);
            });
    }

    static getAddressByOwner(request, response, next)
    {
        const owner = request.params.owner
        GetAddressByOwnerUseCase.process(owner)
            .then(addresses => {
                if (addresses.length <= 0)
                    response.send(new Response(CODE_200, MANY_401_MESSAGE("address"), addresses));
                else
                    response.send(new Response(CODE_200, SUCCESS_MESSAGE("Get address"), addresses));
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

        UpdateAddressByIdUseCase.process(addressId, data)
            .then(address => {
                response.send(new Response(CODE_200, SUCCESS_MESSAGE("Update address"), address));
            })
            .catch(error => {
                error.code === 'P2025' ? next(Error401("Address to update")) : next(error);
            })
    }
}

module.exports = AddressController;
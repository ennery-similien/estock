const {
    CreateTelephoneUseCase,
    GetTelephoneByOwnerUseCase,
    GetAllTelephoneUseCase,
    UpdateTelephoneByIdUseCase
} = require("../../usecases");
const {CODE_200, MANY_401_MESSAGE, SUCCESS_MESSAGE} = require("../../../utilities/constants");
const Response = require("../../output/Response");
const {Error401} = require("../../../utilities/errorUtil");

class TelephoneController
{
    static createTelephone(request, response, next)
    {
        CreateTelephoneUseCase.process(request.body)
            .then(telephone => {
                response.send(new Response(CODE_200, "Create telephone", telephone));
            })
            .catch(error => {
                error.code === 'P2003' ?  next(Error401('Telephone owner')) : next(error);
            });
    }

    static getTelephoneByOwner(request, response, next)
    {
        const owner = request.params.owner;

        GetTelephoneByOwnerUseCase.process(owner)
            .then(telephones => {
                if (telephones.length <= 0)
                    response.send(new Response(CODE_200, MANY_401_MESSAGE("telephone"), telephones));
                else
                    response.send(new Response(CODE_200, SUCCESS_MESSAGE("Get telephone"), telephones));
            })
            .catch(error => { next(error); })
    }

    static getAllTelephones(request, response, next)
    {
        GetAllTelephoneUseCase.process(request.query)
            .then(telephones => {
                if (telephones.length <= 0)
                    response.send(new Response(CODE_200, MANY_401_MESSAGE("telephones"), telephones));
                else
                    response.send(new Response(CODE_200, SUCCESS_MESSAGE("Get telephone"), telephones));
            })
            .catch(error => { next(error); })
    }

    static updateTelephoneById(request, response, next)
    {
        const telephoneId = request.params.telephoneId;
        const data = request.body;

        UpdateTelephoneByIdUseCase.process(telephoneId, data)
            .then(telephone => {
                response.send(new Response(CODE_200, SUCCESS_MESSAGE("Update telephone"), telephone));
            })
            .catch(error => {
                error.code === 'P2025' ? next(Error401("Telephone to update")) : next(error);
            })
    }

}

module.exports = TelephoneController;
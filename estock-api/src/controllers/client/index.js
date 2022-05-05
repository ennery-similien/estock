const {
    CreateClientUseCase,
    GetClientByIdUseCase,
    GetClientByNiuUseCase,
    GetAllClientUseCase,
    UpdateClientByIdUseCase,
    UpdateClientByNiuUseCase
} = require("../../usecases");
const Response = require("../../output/Response");
const {CODE_200, SUCCESS_MESSAGE, MANY_401_MESSAGE} = require("../../../utilities/constants");
const Index = require("../../../utilities/enumIndex");
const {error401} = require("../../../utilities/errorUtil");

class ClientController
{
    static createClient(request, response, next)
    {
        CreateClientUseCase.process(request.body)
            .then(createdClient =>{
                response.send(new Response(CODE_200, SUCCESS_MESSAGE('Create client'),createdClient));
            })
            .catch (error => {
                if(error.meta.target === Index.CLI_NIU_UNIQUE_INDEX)
                    next(new Error('Client\'s NIU already exists'));
                if(error.meta.target === Index.CLI_EMAIL_UNIQUE_INDEX)
                    next(new Error('Client\'s email already exists'));
            });
    }

    static getClientById(request, response, next)
    {
        const clientId = Number.parseInt(request.params.clientId);
        GetClientByIdUseCase.process(clientId)
            .then(client => {
                if(client !== null)
                    response.send(new Response(CODE_200, SUCCESS_MESSAGE('Get client'), client));
                else
                    next(error401(`Client [id: ${clientId}]`));
            });
    }

    static getClientByNiu(request, response, next)
    {
        const clientNiu = request.params.clientNiu;
        GetClientByNiuUseCase.process(clientNiu)
            .then(client => {
                if(client !== null)
                    response.send(new Response(CODE_200, SUCCESS_MESSAGE('Get client'), client));
                else
                    next(error401(`Client [NIU: ${clientNiu}]`));
            });
    }

    static getAll(request, response, next)
    {
        GetAllClientUseCase.process(request.query)
            .then(clients => {
                let message = SUCCESS_MESSAGE('Get clients');

                if(clients.length <= 0)
                    message = MANY_401_MESSAGE('clients');

                response.send(new Response(CODE_200, message, clients))
            })
            .catch(error => {
                next(error);
            })
    }

    static updateClientById(request, response, next)
    {
        const clientId = request.params.clientId;
        const data = request.body;

        UpdateClientByIdUseCase.process(clientId, data, next)
            .then(updatedClient => {
                response.send(
                    new Response(CODE_200, SUCCESS_MESSAGE('Update client'), updatedClient)
                );
            })
            .catch(error => {
                console.log(error);
            })
    }

    static updateClientByNiu(request, response, next)
    {
        const clientNiu = request.params.clientNiu;
        const data = request.body;
        UpdateClientByNiuUseCase.process(clientNiu, data, next)
            .then(updatedClient => {
                response.send(
                    new Response(CODE_200, SUCCESS_MESSAGE('Update client'), updatedClient)
                );
            })
            .catch(error => {
                next(error);
            })
    }
}

module.exports = ClientController;
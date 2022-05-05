const {ClientDataProvider} = require("../../dataproviders");
const {isObjectEmpty} = require("../../../utilities");

class UpdateClientByIdUseCase {
    static process(userId, data, callback)
    {
        const id = Number.parseInt(userId);

        UpdateClientByIdUseCase.#checkUserId(id);
        UpdateClientByIdUseCase.#checkUserExists(id, callback);
        UpdateClientByIdUseCase.#checkData(data);

        return ClientDataProvider.updateClientById(id, data);
    }

    static #checkUserId(userId)
    {
        if(isNaN(Number.parseInt(userId)))
            throw new Error('Invalid client id');
    }

    static #checkUserExists(userId, callback)
    {
        ClientDataProvider.getClientById(Number.parseInt(userId))
            .then(user => {
                user === null && callback(new Error('Client does not exist'));
            })

    }

    static #checkData(data)
    {
        if(isObjectEmpty(data))
            throw new Error('Cannot update client with empty data');
    }

}

module.exports = UpdateClientByIdUseCase;
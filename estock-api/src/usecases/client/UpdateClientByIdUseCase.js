const {ClientDataProvider} = require("../../dataproviders");
const {isObjectEmpty} = require("../../../utilities");
const {clientExistsOnId} = require("../helper");

class UpdateClientByIdUseCase {
    static async process(userId, data, callback) {
        const id = Number.parseInt(userId);

        UpdateClientByIdUseCase.#checkUserId(id);

        if (!await clientExistsOnId(id))
            callback(new Error('Client does not exist'));

        UpdateClientByIdUseCase.#checkData(data);

        return ClientDataProvider.updateClientById(id, data);
    }

    static #checkUserId(userId)
    {
        if(isNaN(userId))
            throw new Error('Invalid client id');
    }

    static #checkData(data)
    {
        if(isObjectEmpty(data))
            throw new Error('Cannot update client with empty data');
    }

}

module.exports = UpdateClientByIdUseCase;
const {ClientDataProvider} = require("../../dataproviders");

class GetClientByIdUseCase {
    static process(userId)
    {
        const id = Number.parseInt(userId);

        GetClientByIdUseCase.#checkUserId(id);

        return ClientDataProvider.getClientById(id);
    }

    static #checkUserId(userId)
    {
        if(isNaN(userId))
            throw new Error('Invalid user id');
    }
}

module.exports = GetClientByIdUseCase;
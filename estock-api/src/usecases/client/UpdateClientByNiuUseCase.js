const {isObjectEmpty} = require("../../../utilities");
const {ClientDataProvider} = require("../../dataproviders");
const {clientExistsOnNiu} = require("../helper");
const {validateNiu} = require("../../../utilities/validator");
class UpdateClientByNiuUseCase {

    static async process(clientNiu, data, callback)
    {
        validateNiu(clientNiu);

        if(!await clientExistsOnNiu(clientNiu))
            callback(new Error('Client does not exist'));

        UpdateClientByNiuUseCase.#checkData(data);

        return ClientDataProvider.updateClientByNiu(clientNiu, data);
    }

    static #checkData(data)
    {
        if(isObjectEmpty(data))
            throw new Error('Cannot update client with empty data');
    }
}

module.exports = UpdateClientByNiuUseCase;
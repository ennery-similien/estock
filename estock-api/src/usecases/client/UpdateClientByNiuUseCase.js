const {isNumeric, isObjectEmpty} = require("../../../utilities");
const {ClientDataProvider} = require("../../dataproviders");
class UpdateClientByNiuUseCase {

    static async process(clientNiu, data, callback)
    {
        UpdateClientByNiuUseCase.#checkClientNiu(clientNiu);
        UpdateClientByNiuUseCase.#checkClientExists(clientNiu, callback);
        UpdateClientByNiuUseCase.#checkData(data);

        return ClientDataProvider.updateClientByNIU(clientNiu, data);
    }

    static #checkClientNiu(clientNiu)
    {
        if(!clientNiu || !isNumeric(clientNiu))
            throw new Error('Client Unique Identity must be a number');

        if(clientNiu.length !== 10)
            throw new Error('Client Unique Identity Number must contain 10 digits');
    }

    static #checkClientExists(clientNiu, callback){
        ClientDataProvider.getClientByNIU(clientNiu)
            .then((client) => {
                if(client === null)
                    callback(new Error('Client does not exist'))
            })
    }

    static #checkData(data)
    {
        if(isObjectEmpty(data))
            throw new Error('Cannot update client with empty data');
    }
}

module.exports = UpdateClientByNiuUseCase;
const {TelephoneDataProvider} = require("../../dataproviders");
const {isObjectEmpty} = require("../../../utilities");

class UpdateTelephoneByIdUseCase {

    static process(telephoneId, data)
    {
        const id = Number.parseInt(telephoneId);

        UpdateTelephoneByIdUseCase.#checkTelephoneId(id);
        UpdateTelephoneByIdUseCase.#checkData(data);

        return TelephoneDataProvider.updateTelephoneById(id, data);
    }

    static #checkTelephoneId(telephoneId)
    {
        if(isNaN(telephoneId))
            throw new Error('Invalid argument: Telephone id must be a number');
    }

    static #checkData(data)
    {
        delete data.owner;

        if(isObjectEmpty(data))
            throw new Error('Cannot update telephone with empty data');
    }
}

module.exports = UpdateTelephoneByIdUseCase;
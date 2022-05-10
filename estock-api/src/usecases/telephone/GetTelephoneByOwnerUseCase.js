const {validateNiu} = require("../../../utilities/validator");
const {TelephoneDataProvider} = require("../../dataproviders");

class GetTelephoneByOwnerUseCase {

    static process(owner)
    {
        GetTelephoneByOwnerUseCase.#checkTelephoneOwner(owner);

        return TelephoneDataProvider.getTelephoneByOwner(owner);
    }

    static #checkTelephoneOwner(owner)
    {
        if(!owner)
            throw new Error("Telephone owner cannot be null");

        validateNiu(owner);
    }
}

module.exports = GetTelephoneByOwnerUseCase;
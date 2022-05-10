const {validateTelephone, validateNiu} = require("../../../utilities/validator");
const {TelephoneDataProvider} = require("../../dataproviders");

class CreateTelephoneUseCase
{
    static process(telephone)
    {
        validateTelephone(telephone);
        CreateTelephoneUseCase.#checkTelephoneOwner(telephone.owner);

        return TelephoneDataProvider.createTelephone(telephone);
    }

    static #checkTelephoneOwner(owner)
    {
        if(!owner)
           throw new Error("Telephone owner must be specified");

        validateNiu(owner);
    }
}

module.exports = CreateTelephoneUseCase;
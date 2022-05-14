const {validateTelephone, validateNiu, validateUniqueId} = require("../../../utilities/validator");
const {TelephoneDataProvider} = require("../../dataproviders");
const {AddressPhoneType} = require("@prisma/client");

class CreateTelephoneUseCase
{
    static process(telephone)
    {
        validateUniqueId(telephone);
        validateTelephone(telephone);
        CreateTelephoneUseCase.#checkTelephoneOwner(telephone.owner);
        CreateTelephoneUseCase.#setTelephoneType(telephone);

        return TelephoneDataProvider.createTelephone(telephone);
    }

    static #setTelephoneType(telephone)
    {
        if(telephone.type === null)
            telephone.type = AddressPhoneType.RESIDENTIAL;
    }

    static #checkTelephoneOwner(owner)
    {
        if(!owner)
           throw new Error("Telephone owner must be specified");

        validateNiu(owner);
    }
}

module.exports = CreateTelephoneUseCase;
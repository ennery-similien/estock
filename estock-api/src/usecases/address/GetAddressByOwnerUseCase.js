const {AddressDataProvider} = require("../../dataproviders");
const {validateNiu} = require("../../../utilities/validator");

class GetAddressByOwnerUseCase
{
    static async process(owner) {
        GetAddressByOwnerUseCase.#checkAddressOwner(owner);

        return AddressDataProvider.getAddressByOwner(owner);
    }

    static #checkAddressOwner(owner)
    {
        if(!owner)
            throw new Error('Address owner must be specified');

        validateNiu(owner);
    }
}

module.exports = GetAddressByOwnerUseCase;
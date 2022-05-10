const {AddressDataProvider} = require("../../dataproviders");
const {validateAddress, validateNiu} = require("../../../utilities/validator");

class CreateAddressUseCase {

    static process(address)
    {
        validateAddress(address);
        CreateAddressUseCase.#checkAddressOwner(address.owner)

        return AddressDataProvider.createAddress(address);
    }

    static #checkAddressOwner(owner) {

        if (!owner)
            throw new Error('Address cannot exist without owner');

        validateNiu(owner);
    }
}

module.exports = CreateAddressUseCase;
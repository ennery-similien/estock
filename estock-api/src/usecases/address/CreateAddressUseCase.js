const {AddressDataProvider} = require("../../dataproviders");
const {validateAddress, validateNiu} = require("../../../utilities/validator");
const {userExistsOnNiu, clientExistsOnNiu} = require("../helper");

class CreateAddressUseCase {

    static process(address, callback)
    {
        validateAddress(address);
        CreateAddressUseCase.#checkAddressOwner(address, callback)

        return AddressDataProvider.createAddress(address);
    }

    static #checkAddressOwner(address, callback) {

        if (!address.userNiu && !address.clientNiu)
            throw new Error('Address cannot exist without owner');

        CreateAddressUseCase.#userExists(address.userNiu, callback)
            .then();
        CreateAddressUseCase.#clientExits(address.clientNiu, callback)
            .then();
    }

    static async #userExists(userNiu, callback)
    {
        if (userNiu) {
            validateNiu(userNiu);

            if(!await userExistsOnNiu(userNiu))
                callback(new Error('Address owner does not exist'));
        }
    }

    static  async #clientExits(clientNiu, callback)
    {
        if (clientNiu) {
            validateNiu(clientNiu);

            if(!await clientExistsOnNiu(clientNiu))
                callback(new Error('Address owner does not exist'));
        }
    }
}

module.exports = CreateAddressUseCase;
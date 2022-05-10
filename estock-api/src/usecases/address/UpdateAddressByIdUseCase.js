const {isObjectEmpty} = require("../../../utilities");
const {AddressDataProvider} = require("../../dataproviders");

class UpdateAddressByIdUseCase
{
    static async process(addressId, data) {
        const id = Number.parseInt(addressId);

        UpdateAddressByIdUseCase.#checkAddressId(id);
        UpdateAddressByIdUseCase.#checkAddressData(data);

        return AddressDataProvider.updateAddressById(id, data);
    }

    static #checkAddressId(addressId) {
        if (isNaN(addressId))
            throw new Error('Invalid address id, must be a number');
    }

    static #checkAddressData(data) {
        delete data.owner;

        if (isObjectEmpty(data))
            throw new Error('Cannot update address with empty data');
    }
}

module.exports = UpdateAddressByIdUseCase;
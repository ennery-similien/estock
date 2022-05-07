const {isObjectEmpty} = require("../../../utilities");
const {AddressDataProvider} = require("../../dataproviders");

class UpdateAddressByIdUseCase {
    static async process(addressId, data, callback) {
        const id = Number.parseInt(addressId);

        UpdateAddressByIdUseCase.#checkAddressId(id);

        if (!await UpdateAddressByIdUseCase.#addressExists(id))
            callback(new Error('Address does not exist'));

        UpdateAddressByIdUseCase.#checkAddressData(data);

        return AddressDataProvider.updateAddressById(id, data);
    }

    static #checkAddressId(addressId) {
        if (isNaN(addressId))
            throw new Error('Invalid address id, must be a number');
    }

    static #checkAddressData(data) {
        if (isObjectEmpty(data))
            throw new Error('Cannot update address with empty data');

        delete data.userNiu;
        delete data.clientNiu;
    }

    static #addressExists(addressId) {
        return AddressDataProvider.getAddressById(addressId)
            .then(address => {
                return !!address;
            });
    }
}

module.exports = UpdateAddressByIdUseCase;
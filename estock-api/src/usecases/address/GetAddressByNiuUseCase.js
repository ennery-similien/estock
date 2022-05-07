const {validateNiu} = require("../../../utilities/validator");
const {AddressDataProvider} = require("../../dataproviders");
const {clientExistsOnNiu, userExistsOnNiu} = require("../helper");

class GetAddressByNiuUseCase
{
    static async process(niu, params, callback) {
        validateNiu(niu);

        if (!await userExistsOnNiu(niu) && !await clientExistsOnNiu(niu))
             callback('User or Client does not exist');

        return AddressDataProvider.getAddressByNiu(niu, !!params.include);
    }
}

module.exports = GetAddressByNiuUseCase;
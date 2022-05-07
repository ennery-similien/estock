const {isObjectEmpty} = require("../../../utilities");
const {UserDataProvider} = require("../../dataproviders");
const {userExistsOnNiu} = require("../helper");
const {validateNiu} = require("../../../utilities/validator");

class UpdateUserByNiuUseCase {

    static async process(userNiu, data, callback)
    {
        validateNiu(userNiu);

        if(await userExistsOnNiu(userNiu))
            callback(new Error('User does not exist'));

        UpdateUserByNiuUseCase.#checkData(data);

        return UserDataProvider.updateUserByNiu(userNiu, data);
    }

    static #checkData(data)
    {
        if(isObjectEmpty(data))
            throw new Error('Cannot update user with empty data');
    }
}

module.exports = UpdateUserByNiuUseCase;
const {UserDataProvider} = require("../../dataproviders");
const {isObjectEmpty} = require("../../../utilities");
const {userExistsOnId} = require("../helper");

class UpdateUserByIdUseCase {
    static async process(userId, data, callback) {
        const id = Number.parseInt(userId);

        UpdateUserByIdUseCase.#checkUserId(id);

        if (!await userExistsOnId(id))
            callback(new Error('User does not exist'));

        UpdateUserByIdUseCase.#checkData(data);

        return UserDataProvider.updateUserById(id, data);
    }

    static #checkUserId(userId)
    {
        if(isNaN(userId))
            throw new Error('Invalid user id');
    }

    static #checkData(data)
    {
        if(isObjectEmpty(data))
            throw new Error('Cannot update user with empty data');
    }

}

module.exports = UpdateUserByIdUseCase;
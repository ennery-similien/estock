const {UserDataProvider} = require("../../dataproviders");
const {isObjectEmpty} = require("../../../utilities");

class UpdateUserByIdUseCase {
    static process(userId, data) {
        const id = Number.parseInt(userId);

        UpdateUserByIdUseCase.#checkUserId(id);
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
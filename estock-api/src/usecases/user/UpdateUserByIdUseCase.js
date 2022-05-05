const {UserDataProvider} = require("../../dataproviders");
const {isObjectEmpty} = require("../../../utilities");

class UpdateUserByIdUseCase {
    static process(userId, data, callback)
    {
        const id = Number.parseInt(userId);

        UpdateUserByIdUseCase.#checkUserId(id);
        UpdateUserByIdUseCase.#checkUserExists(id, callback);
        UpdateUserByIdUseCase.#checkData(data);

        return UserDataProvider.updateUserById(id, data);
    }

    static #checkUserId(userId)
    {
        if(isNaN(Number.parseInt(userId)))
            throw new Error('Invalid user id');
    }

    static #checkUserExists(userId, callback)
    {
        UserDataProvider.getUserById(Number.parseInt(userId))
            .then(user => {
                user === null && callback(new Error('User does not exist'));
            })

    }

    static #checkData(data)
    {
        if(isObjectEmpty(data))
            throw new Error('Cannot update user with empty data');
    }

}

module.exports = UpdateUserByIdUseCase;
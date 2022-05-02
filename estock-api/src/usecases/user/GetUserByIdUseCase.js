const UserDataProvider = require("../../dataproviders/UserDataProvider");

class GetUserByIdUseCase {
    static process(userId)
    {
        const id = Number.parseInt(userId);

        GetUserByIdUseCase.#checkUserId(id);

        return UserDataProvider.getUserById(id);
    }

    static #checkUserId(userId)
    {
        if(isNaN(userId))
            throw new Error('Invalid user id');
    }
}

module.exports = GetUserByIdUseCase;
const {UserDataProvider} = require("../../dataproviders");

class GetUserByIdUseCase {
    static process(userId)
    {
        const id = Number.parseInt(userId);
        const excludeFilter = ["createdAt", "updatedAt", "password"];

        GetUserByIdUseCase.#checkUserId(id);

        return UserDataProvider.getUserById(id, excludeFilter);
    }

    static #checkUserId(userId)
    {
        if(isNaN(userId))
            throw new Error('Invalid user id');
    }
}

module.exports = GetUserByIdUseCase;
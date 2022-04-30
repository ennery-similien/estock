const UserDataProvider = require("../../dataproviders/UserDataProvider");

class UpdateUserByIdUseCase {
    static process(userId, data)
    {
        UpdateUserByIdUseCase.checkUserId(userId);
        UpdateUserByIdUseCase.checkUserExists(userId);

        return UserDataProvider.updateUserById(userId, data);
    }

    static checkUserId(userId)
    {
        if(isNaN(Number.parseInt(userId)))
            throw new Error('Invalid user id');
    }

    static checkUserExists(userId)
    {
        if(!UserDataProvider.getUserById(userId))
            throw new Error('User does not exist');
    }
}

module.exports = UpdateUserByIdUseCase;
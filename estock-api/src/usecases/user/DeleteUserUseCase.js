const UserDataProvider = require("../../dataproviders/UserDataProvider");

class DeleteUserUseCase
{
    static process(userId)
    {

        return UserDataProvider.deleteUser(userId)
    }
}

module.exports = DeleteUserUseCase;
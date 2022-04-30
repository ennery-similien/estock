const UserDataProvider = require("../../dataproviders/UserDataProvider");

class GetAllUserUseCase
{
    static process(regex)
    {
        return UserDataProvider.getAllUser(regex);
    }
}

module.exports = GetAllUserUseCase;
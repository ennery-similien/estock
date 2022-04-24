const UserDataProvider = require("../../dataproviders/UserDataProvider");
const {isHumanName, isNumeric} = require('../../../utilities');

class CreateUserUseCase {

    static process(user) {
        //CreateUserUseCase.checkUserUserName(user.username)
        //CreateUserUseCase.checkUserName(user.fname.concat(user.lname))

        return UserDataProvider.createUser(user)
    }

    static checkUserUserName(username)
    {
        if(!username || !isNumeric(username) || username.length !== 10)
            new Error("Invalid Username")
    }

    static checkUserName(fullname)
    {
        if(!fullname || !isHumanName(fullname))
            new Error("Invalid first or last name")
    }
}

module.exports = CreateUserUseCase;
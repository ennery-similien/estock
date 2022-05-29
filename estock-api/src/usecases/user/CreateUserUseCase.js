const {UserDataProvider} = require("../../dataproviders");
const {PASSWORD_OPTIONS} = require("../../../utilities/constants");
const passwordHash = require("password-hash");
const {Role} = require("@prisma/client");
const {User} = require("../../domain/models");
const UserValidator = require("./UserValidator");

class CreateUserUseCase
{
    static process(inputData) {

        const user = new User().from(inputData);
        const excludeFilter = ["password", "createdAt", "updatedAt"];

        new UserValidator().validate(user);

        this.#setUserRole(user);
        this.#setUserPasswordHash(user);

        return UserDataProvider.createUser(user, excludeFilter);
    }

    static #setUserPasswordHash(user)
    {
        if(!user.password) return;

        const hashedPassword = passwordHash.generate(user.password, PASSWORD_OPTIONS);

        if(!hashedPassword)
            throw new Error('An error occurred, please try again');

        user.password = hashedPassword;
    }

    static #setUserRole(user)
    {
        if (!user.role)
            user.role = Role.SALESMAN;
    }
}

module.exports = CreateUserUseCase;
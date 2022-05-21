const {UserDataProvider} = require("../../dataproviders");
const {isObjectEmpty, objectKeyExits} = require("../../../utilities");
const passwordHash = require("password-hash");
const {PASSWORD_OPTIONS} = require("../../../utilities/constants");
const UserValidator = require("./UserValidator");

class UpdateUserByIdUseCase
{
    static async process(userId, data)
    {
        const id = Number.parseInt(userId);
        const excludeFilter = ["createdAt", "updatedAt"];

        this.#checkUserId(id);
        this.#checkData(data);

        const user = await UserDataProvider.getUserById(id, excludeFilter);

        this.#setNewValues(user, data);

        new UserValidator().validate(user);

        this.#setUserPassword(user);

        return UserDataProvider.updateUserById(user, excludeFilter);
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

    static #setNewValues(user, data)
    {
        for(const [key, value] of Object.entries(data))
            if(objectKeyExits(user, key))
                user[key] =  value;

        return user;
    }

    static #setUserPassword(user)
    {
        if(!user.password || passwordHash.isHashed(user.password)) return;

        const hashedPassword = passwordHash.generate(user.password, PASSWORD_OPTIONS);

        if(!passwordHash.isHashed(hashedPassword))
            throw new Error("An error occurred while hashing the password");

        user.password = hashedPassword;
    }
}

module.exports = UpdateUserByIdUseCase;
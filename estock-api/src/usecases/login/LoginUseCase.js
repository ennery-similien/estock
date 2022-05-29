const {isObjectEmpty} = require("../../../utilities");
const {validateData, validateNiu} = require("../../../utilities/validator");
const {LoginDataProvider, UserDataProvider} = require("../../dataproviders");
const passwordHash = require("password-hash");
const {TOKEN_SECRET_KEY} = process.env
const JWT = require("jsonwebtoken");
const LoginOutputData = require("./LoginOutputData");


const provider = new LoginDataProvider();

class LoginUseCase {

    async process(inputData)
    {
        LoginUseCase.#validateInputData(inputData);

        const user = await LoginUseCase.#getUser(inputData);

        LoginUseCase.#validatePassword(user, inputData);
        await LoginUseCase.#validateToken(user);

        return new LoginOutputData(user);
    }

    static async #validateToken(user) {
        if (user.token) {
            const {exp} = JWT.decode(user.token);

            if ((exp * 1000) > Date.now())
                return;
        }

        const payload = {
            userId: user.id,
            login: user.niu,
            role: user.role
        };

        const options = {
            expiresIn: "8h"
        }

        user.token = await JWT.sign(payload, TOKEN_SECRET_KEY, options);

        await UserDataProvider.updateUserById(
            {
                id: user.id,
                token: user.token,
                isOnline: true
            },
            []
        );
    }

    static #validatePassword(user, inputData) {
        if(!passwordHash.verify(inputData.password, user.password))
            throw new Error("Password is incorrect");
    }

    static #validateInputData(inputData) {
        if(isObjectEmpty(inputData))
            throw new Error("Set all necessary data");

        validateData(inputData.login, "Invalid user login");
        validateData(inputData.password, "Invalid user Password");

        validateNiu(inputData.login);
    }

    static async #getUser(inputData) {
        const user = await provider.getUserByLogin(inputData);

        if(user === null)
            throw new Error("User does not exist");

        return user;
    }
}

module.exports = LoginUseCase;
const {isNumeric, isObjectEmpty} = require("../../../utilities");
const {UserDataProvider} = require("../../dataproviders");

class UpdateUserByNiuUseCase {

    static async process(userNiu, data, next)
    {
        UpdateUserByNiuUseCase.#checkUserNiu(userNiu);
        UpdateUserByNiuUseCase.#checkUserExists(userNiu, next);
        UpdateUserByNiuUseCase.#checkData(data);

        return UserDataProvider.updateUserByNIU(userNiu, data);
    }

    static #checkUserNiu(userNiu)
    {
        if(!userNiu || !isNumeric(userNiu))
            throw new Error('User Unique Identity must be a number');

        if(userNiu.length !== 10)
            throw new Error('User Unique Identity Number must contain 10 digits');
    }

    static #checkUserExists(userNiu, next){
        UserDataProvider.getUserByNIU(userNiu)
            .then((user) => {
                if(user === null)
                    next(new Error('User does not exist'))
            })
    }

    static #checkData(data)
    {
        if(isObjectEmpty(data))
            throw new Error('Cannot update user with empty data');
    }
}

module.exports = UpdateUserByNiuUseCase;
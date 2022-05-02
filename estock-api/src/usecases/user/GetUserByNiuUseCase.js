const {isNumeric} = require("../../../utilities");
const UserDataProvider = require("../../dataproviders/UserDataProvider");

class GetUserByNiuUseCase {

    static process(userNiu)
    {
        GetUserByNiuUseCase.#checkUserNiu(userNiu);

        return UserDataProvider.getUserByNIU(userNiu);
    }

    static #checkUserNiu(userNiu)
    {
        if(!userNiu || !isNumeric(userNiu))
            throw new Error('User Unique Identity must be a number');

        if(userNiu.length !== 10)
            throw new Error('User Unique Identity Number must contain 10 digits');
    }
}

module.exports = GetUserByNiuUseCase;
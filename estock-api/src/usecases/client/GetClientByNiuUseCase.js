const {isNumeric} = require("../../../utilities");
const {ClientDataProvider} = require("../../dataproviders");

class GetClientByNiuUseCase {

    static process(userNiu)
    {
        GetClientByNiuUseCase.#checkUserNiu(userNiu);

        return ClientDataProvider.getClientByNIU(userNiu);
    }

    static #checkUserNiu(userNiu)
    {
        if(!userNiu || !isNumeric(userNiu))
            throw new Error('User Unique Identity must be a number');

        if(userNiu.length !== 10)
            throw new Error('User Unique Identity Number must contain 10 digits');
    }
}

module.exports = GetClientByNiuUseCase;
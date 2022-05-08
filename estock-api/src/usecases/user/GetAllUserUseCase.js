const {UserDataProvider} = require("../../dataproviders");
const QueryParams = require("../../../utilities/QueryParams");

class GetAllUserUseCase
{
    static process(params)
    {
        const regex = QueryParams.builder()
            .skip(params.skip)
            .take(params.take)
            .orderBy(params.orderBy)
            .whereConjunctions(params.conjunction)
            .where(params.where)
            .build();

        return UserDataProvider.getAllUser(regex);
    }
}

module.exports = GetAllUserUseCase;
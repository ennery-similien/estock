const {UserDataProvider} = require("../../dataproviders");
const QueryParams = require("../../../utilities/QueryParams");

class GetAllUserUseCase
{
    static process(params)
    {
        const excludeFilter = ["createdAt", "updatedAt", "password"];

        const regex = QueryParams.builder()
            .skip(params.skip)
            .take(params.take)
            .orderBy(params.orderBy)
            .whereConjunctions(params.conjunction)
            .where(params.where)
            .build();

        return UserDataProvider.getAllUser(regex, excludeFilter);
    }
}

module.exports = GetAllUserUseCase;
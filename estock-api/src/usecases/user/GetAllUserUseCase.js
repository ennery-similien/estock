const UserDataProvider = require("../../dataproviders/UserDataProvider");
const QueryParams = require("../../../utilities/QueryParams");

class GetAllUserUseCase
{
    static process(params)
    {
        const regex = QueryParams.builder()
            .skip(params.skip)
            .take(params.take)
            .orderBy(params.orderBy)
            .having(params.having)
            .where(params.where, params.whereCon)
            .build();

        return UserDataProvider.getAllUser(regex);
    }
}

module.exports = GetAllUserUseCase;
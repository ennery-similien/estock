const {ClientDataProvider} = require("../../dataproviders");
const QueryParams = require("../../../utilities/QueryParams");

class GetAllClientUseCase
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

        return ClientDataProvider.getAllClient(regex);
    }
}

module.exports = GetAllClientUseCase;
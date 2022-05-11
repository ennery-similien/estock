const QueryParams = require("../../../utilities/QueryParams");
const {TelephoneDataProvider} = require("../../dataproviders");

class GetAllTelephoneUseCase {

    static process(params)
    {
        const queryParams = QueryParams.builder()
            .skip(params.skip)
            .take(params.take)
            .whereConjunctions(params.conjunction)
            .where(params.where)
            .orderBy(params.orderBy)
            .build();

        if(params.include)
            queryParams.include = {user: true};

        return TelephoneDataProvider.getAllTelephones(queryParams);
    }
}

module.exports = GetAllTelephoneUseCase;
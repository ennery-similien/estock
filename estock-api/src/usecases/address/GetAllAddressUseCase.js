const {AddressDataProvider} = require("../../dataproviders");
const QueryParams = require("../../../utilities/QueryParams");

class GetAllAddressUseCase
{
    static process(params)
    {
        let queryParams = QueryParams.builder()
            .skip(params.skip)
            .take(params.take)
            .whereConjunctions(params.conjunction)
            .where(params.where)
            .orderBy(params.orderBy)
            .build();

        if(params.include)
            queryParams.include = {
                user: true,
                client: true
            }

        return AddressDataProvider.getAllAddress(queryParams);
    }
}

module.exports = GetAllAddressUseCase;
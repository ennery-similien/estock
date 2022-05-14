const QueryParams = require("../../../utilities/QueryParams");
const {provider} = require("../../dataproviders");

class GetAllProductsUseCase {
    process(params)
    {
        const queryParams = QueryParams.builder()
            .skip(params.skip)
            .take(params.take)
            .whereConjunctions(params.conjunction)
            .where(params.where)
            .orderBy(params.orderBy)
            .build()

        if(params.include)
            return provider.getAllProductsWithOrders(queryParams);

        return provider.getAllProducts(queryParams);
    }
}

module.exports = GetAllProductsUseCase;
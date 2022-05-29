const {validateData, validateNiu} = require("../../../utilities/validator");
const QueryParams = require("../../../utilities/QueryParams");
const {orderDataProvider} = require("../../dataproviders");
const {exclude} = require("../../../database");
const {isObjectEmpty} = require("../../../utilities");

class GetAllOrderUseCase {
    process(params)
    {
        const queryParams = QueryParams.builder()
            .skip(params.skip)
            .take(params.take)
            .whereConjunctions(params.conjunction)
            .where(params.where)
            .orderBy(params.orderBy)
            .build();

        GetAllOrderUseCase.#validateSeller(queryParams);

        const excludeFilter = ["createdAt", "updatedAt"];

        const selectsOptions = {
            items: {
                select:{
                    ...exclude("orderItem", excludeFilter),
                    product: {
                        select: exclude("product", excludeFilter)
                    }
                }
            }
        }

        return orderDataProvider.getAllOrder(queryParams, excludeFilter, selectsOptions);
    }

    static #validateSeller(queryParams)
    {
        if(!isObjectEmpty(queryParams.where))
        {
            const seller = queryParams.where[QueryParams.getConjunction()]
                .find(obj => obj.user !== undefined);

            if(seller)
            {
                validateData(seller.user, "Seller must not be empty or null");
                validateNiu(seller.user);
            }
        }
    }
}

module.exports = GetAllOrderUseCase;
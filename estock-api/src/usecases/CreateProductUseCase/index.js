const {isObjectEmpty} = require('../../../utilities');

class CreateProductUseCase {

    static process(product)
    {
        if(isObjectEmpty(product))
            throw new Error('Cannot add en empty product');


        return product;
    }
}

module.exports = CreateProductUseCase;
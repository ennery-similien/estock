const {isObjectEmpty, isAlphaNum} = require('../../../utilities');
const {Product} = require("../../domain/models");
const {provider} = require("../../dataproviders");
const Integer = require("../../../utilities/Integer");
const {validateData} = require("../../../utilities/validator");
const Validator = require("./Validator");

class CreateProductUseCase {

    process(inputData)
    {
        const product = new Product().from(inputData);

        CreateProductUseCase.#verifyProductEmpty(product);

        new Validator().validate(product);

        CreateProductUseCase.#validateBarCodeEAN_13(product.barcode);
        CreateProductUseCase.#validateProperties(product.properties);
        CreateProductUseCase.#validateImages(product.images);

        return provider.createProduct(product);
    }

    static #verifyProductEmpty(product)
    {
        if(isObjectEmpty(product))
            throw new Error('Cannot add en empty product');
    }

    static #validateBarCodeEAN_13(barcode)
    {
        if(!isAlphaNum(barcode))
            throw new Error("[Invalid Value]: Barcode must be a valid alphanumeric sequence");

        if(!new Integer(barcode.length).isEnter(12, 13))
            throw new Error("[Invalid Value]: Product barcode length must be enter 12-13 characters");
    }

    static #validateProperties(properties)
    {
        properties.forEach(property => {
            validateData(property.value, `Property ${property.key} must not be empty or null`);
        });
    }

    static #validateImages(images)
    {
        images.forEach(image => {
            validateData(image.name, `Image ${image.key} name must not be empty or null`);
            validateData(image.url, `Image ${image.key} url must not be empty or null`);
        });
    }
}

module.exports = CreateProductUseCase;
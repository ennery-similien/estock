const {validateData} = require("../../../utilities/validator");
const {isAlphaNum, objectKeyExits, isObjectEmpty} = require("../../../utilities");
const Integer = require("../../../utilities/Integer");
const {provider} = require("../../dataproviders");
const Validator = require("./Validator");

class UpdateProductByBarcodeUseCase {
    async process(productBarcode, data)
    {
        validateData(productBarcode, "Product barcode must not be empty or null");
        UpdateProductByBarcodeUseCase.#validateBarCodeEAN_13(productBarcode);
        UpdateProductByBarcodeUseCase.#validateData(data);

        const product = await provider.getProductByBarcode(productBarcode);

        UpdateProductByBarcodeUseCase.#validateProductExists(product);

        UpdateProductByBarcodeUseCase.#setNewValues(product, data);
        new Validator().validate(product);

        UpdateProductByBarcodeUseCase.#validateProperties(product.properties);
        UpdateProductByBarcodeUseCase.#validateImages(product.images);

        return provider.updateProductByBarcode(product);
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

    static #setNewValues(product, data) {
        for(const [key, value] of Object.entries(data))
            if(objectKeyExits(product, key))
                product[key] =  value;

        return product;
    }

    static #validateBarCodeEAN_13(barcode)
    {
        if(!isAlphaNum(barcode))
            throw new Error("[Invalid Value]: Barcode must be a valid alphanumeric sequence");

        if(!new Integer(barcode.length).isEnter(12, 13))
            throw new Error("[Invalid Value]: Product barcode length must be enter 12-13 characters");

    }

    static #validateData(data) {
        if(isObjectEmpty(data))
            throw new Error("[Invalid Data]: Cannot update product with empty data");
    }

    static #validateProductExists(product)
    {
        if(product === null)
            throw new Error("Product to update does not exist");
    }
}

module.exports = UpdateProductByBarcodeUseCase;
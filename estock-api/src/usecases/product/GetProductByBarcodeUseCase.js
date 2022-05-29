const {validateData} = require("../../../utilities/validator");
const {isAlphaNum} = require("../../../utilities");
const Integer = require("../../../utilities/Integer");
const {provider} = require("../../dataproviders");

class GetProductByBarcodeUseCase {
    process(barcode)
    {
        validateData(barcode, "[Invalid Value]: Barcode must not be empty or null");
        GetProductByBarcodeUseCase.#validateBarCodeEAN_13(barcode);

        return provider.getProductByBarcode(barcode);
    }

    static #validateBarCodeEAN_13(barcode)
    {
        if(!isAlphaNum(barcode))
            throw new Error("[Invalid Value]: Barcode must be a valid alphanumeric sequence");

        if(!new Integer(barcode.length).isEnter(12, 13))
            throw new Error("[Invalid Value]: Product barcode length must be enter 12-13 characters");

    }
}

module.exports = GetProductByBarcodeUseCase;
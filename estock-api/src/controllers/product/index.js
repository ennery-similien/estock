const {CreateProductUseCase, GetProductByBarcodeUseCase, GetAllProductsUseCase, UpdateProductByBarcodeUseCase} = require("../../usecases");
const {SUCCESS_MESSAGE, CODE_200, SINGLE_401_MESSAGE, MANY_401_MESSAGE} = require("../../../utilities/constants");
const Index = require("../../../utilities/enumIndex");
const Response = require("../../output/Response");
const {Error401} = require("../../../utilities/errorUtil");
const useCase = {
    create: new CreateProductUseCase(),
    getByBarcode: new GetProductByBarcodeUseCase(),
    getAll: new GetAllProductsUseCase(),
    update: new UpdateProductByBarcodeUseCase(),
}

class ProductController {

    static createProduct(request, response, next)
    {
        useCase.create.process(request.body)
            .then(product => {
                response.send(new Response(CODE_200, SUCCESS_MESSAGE("Create product"), product));
            })
            .catch(error => {
                if (error.meta?.target === Index.PRO_BARCODE_UNIQUE_INDEX)
                    next(new Error("Product barcode already exists, please create new barcode"));
                else
                    next(error);
            });
    }

    static getProductById(request, response, next)
    {
    }

    static getProductByBarcode(request, response, next)
    {
        const barcode = request.params.barcode;

        useCase.getByBarcode.process(barcode)
            .then(product => {
                if(product !== null)
                    response.send(new Response(CODE_200, SUCCESS_MESSAGE("Get Product"), product));
                else
                    response.send(new Response(CODE_200, SINGLE_401_MESSAGE("Product"), product));
            })
            .catch(error => next(error))
    }

    static getAllProducts(request, response, next){
        useCase.getAll.process(request.query)
            .then(products => {
                if(products.length > 0)
                    response.send(new Response(CODE_200, SUCCESS_MESSAGE("Get products"), products));
                else
                    response.send(new Response(CODE_200, MANY_401_MESSAGE("products"), products));
            })
            .catch(error => { next(error); });
    }

    static updateProductById(request, response, next){

    }

    static updateProductByBarcode(request, response, next){
        const barcode = request.params.barcode;
        const data = request.body;

        useCase.update.process(barcode, data)
            .then(product => {
                response.send(new Response(CODE_200, SUCCESS_MESSAGE("Update product"), product));
            })
            .catch(error => {
                error.code === 'P2025' ? next(Error401("Product to update")) : next(error);
            });
    }
}

module.exports = ProductController;
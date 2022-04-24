const CreateProductUseCase = require("../../usecases/CreateProductUseCase");

class ProductController {
    static createProduct(request, response, next)
    {
        return response.send(
            CreateProductUseCase.process(request.body)
        );
    }

    static getProductById(request, response, next)
    {

    }

    static getAll(request, response, next){

    }

    static getAllByRegex(request, response, next){

    }

    static updateProduct(request, response, next){

    }

    static updateAllByRegex(request, response, next){

    }

    static deleteProduct(request, response, next){

    }

    static deleteAllByRegex(request, response, next){

    }
}

module.exports = ProductController;
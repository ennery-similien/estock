/**
 * @description import all user use case
 */
const CreateUserUseCase = require('./user/CreateUserUseCase');
const GetAllUserUseCase = require('./user/GetAllUserUseCase');
const GetUserByIdUseCase = require('./user/GetUserByIdUseCase');
const UpdateUserByIdUseCase = require('./user/UpdateUserByIdUseCase');


/**
 * @description All address use case
 */

const CreateAddressUseCase = require('./address/CreateAddressUseCase');
const GetAllAddressUseCase = require('./address/GetAllAddressUseCase');
const GetAddressByOwnerUseCase = require('./address/GetAddressByOwnerUseCase');
const UpdateAddressByIdUseCase = require('./address/UpdateAddressByIdUseCase');

/**
 * @description all telephone use case
 */
const CreateTelephoneUseCase = require('./telephone/CreateTelephoneUseCase');
const GetTelephoneByOwnerUseCase = require('./telephone/GetTelephoneByOwnerUseCase');
const GetAllTelephoneUseCase = require('./telephone/GetAllTelephoneUseCase');
const UpdateTelephoneByIdUseCase = require('./telephone/UpdateTelephoneByIdUseCase');


/**
 * @description all product use case
 */

const CreateProductUseCase = require('./product/CreateProductUseCase');
const GetProductByBarcodeUseCase = require('./product/GetProductByBarcodeUseCase');
const GetAllProductsUseCase = require('./product/GetAllProductsUseCase');
const UpdateProductByBarcodeUseCase = require('./product/UpdateProductByBarcodeUseCase');

module.exports = {
    CreateUserUseCase,
    GetUserByIdUseCase,
    GetAllUserUseCase,
    UpdateUserByIdUseCase,
    CreateAddressUseCase,
    GetAddressByOwnerUseCase,
    GetAllAddressUseCase,
    UpdateAddressByIdUseCase,
    CreateTelephoneUseCase,
    GetTelephoneByOwnerUseCase,
    GetAllTelephoneUseCase,
    UpdateTelephoneByIdUseCase,
    CreateProductUseCase,
    GetProductByBarcodeUseCase,
    GetAllProductsUseCase,
    UpdateProductByBarcodeUseCase,
}
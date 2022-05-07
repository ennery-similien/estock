/**
 * @description import all user use case
 */
const CreateUserUseCase = require('./user/CreateUserUseCase');
const GetAllUserUseCase = require('./user/GetAllUserUseCase');
const GetUserByIdUseCase = require('./user/GetUserByIdUseCase');
const GetUserByNiuUseCase = require('./user/GetUserByNiuUseCase');
const UpdateUserByIdUseCase = require('./user/UpdateUserByIdUseCase');
const UpdateUserByNiuUseCase = require('./user/UpdateUserByNiuUseCase');

/**
 * @description import all client use case
 */

const CreateClientUseCase = require('./client/CreateClientUseCase');
const GetClientByIdUseCase = require('./client/GetClientByIdUseCase');
const GetClientByNiuUseCase = require('./client/GetClientByNiuUseCase');
const GetAllClientUseCase = require('./client/GetAllClientUseCase');
const UpdateClientByIdUseCase = require('./client/UpdateClientByIdUseCase');
const UpdateClientByNiuUseCase = require('./client/UpdateClientByNiuUseCase');

/**
 * @description All address use case
 */

const CreateAddressUseCase = require('./address/CreateAddressUseCase');
const GetAllAddressUseCase = require('./address/GetAllAddressUseCase');
const GetAddressByNiuUseCase = require('./address/GetAddressByNiuUseCase');
const UpdateAddressByIdUseCase = require('./address/UpdateAddressByIdUseCase');


module.exports = {
    CreateUserUseCase,
    GetUserByIdUseCase,
    GetUserByNiuUseCase,
    GetAllUserUseCase,
    UpdateUserByIdUseCase,
    UpdateUserByNiuUseCase,
    CreateClientUseCase,
    GetClientByIdUseCase,
    GetClientByNiuUseCase,
    GetAllClientUseCase,
    UpdateClientByIdUseCase,
    UpdateClientByNiuUseCase,
    CreateAddressUseCase,
    GetAddressByNiuUseCase,
    GetAllAddressUseCase,
    UpdateAddressByIdUseCase
}
/**
 * @description import all user use case
 */
const CreateUserUseCase = require('./user/CreateUserUseCase');
const GetAllUserUseCase = require('./user/GetAllUserUseCase');
const GetUserByIdUseCase = require('./user/GetUserByIdUseCase');
const GetUserByNiuUseCase = require('./user/GetUserByNiuUseCase');
const UpdateUserByIdUseCase = require('./user/UpdateUserByIdUseCase');
const UpdateUserByNiuUseCase = require('./user/UpdateUserByNiuUseCase');



module.exports = {
    CreateUserUseCase,
    GetUserByIdUseCase,
    GetUserByNiuUseCase,
    GetAllUserUseCase,
    UpdateUserByIdUseCase,
    UpdateUserByNiuUseCase,
}
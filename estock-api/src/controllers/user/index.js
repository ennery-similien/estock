const {
    CreateUserUseCase,
    GetUserByIdUseCase,
    GetUserByNiuUseCase,
    GetAllUserUseCase,
    UpdateUserByIdUseCase,
    UpdateUserByNiuUseCase
} = require('../../usecases');

const Index = require("../../../utilities/enumIndex");
const Response = require('../../output/Response');
const {error401} = require("../../../utilities/errorUtil");
const {CODE_200, SUCCESS_MESSAGE, MANY_401_MESSAGE} = require('../../../utilities/constants');

class UserController
{
    static createUser(request, response, next)
    {
        CreateUserUseCase.process(request.body)
            .then(createdUser =>{
                response.send(new Response(CODE_200, SUCCESS_MESSAGE('Create user'),createdUser));
            })
            .catch (error => {
                if(error.meta.target === Index.USR_NIU_UNIQUE_INDEX)
                    next(new Error('User\'s NIU already exists'));
                if(error.meta.target === Index.USR_EMAIL_UNIQUE_INDEX)
                    next(new Error('User\'s email already exists'));
            });

    }

    static getUserById(request, response, next)
    {
        const userId = Number.parseInt(request.params.userId);
        GetUserByIdUseCase.process(userId)
            .then(user => {
                if(user !== null)
                    response.send(new Response(CODE_200, SUCCESS_MESSAGE('Get user'), user));
                else
                    next(error401(`User [id: ${userId}]`));
            });
    }

    static getUserByNiu(request, response, next)
    {
        const userNIU = request.params.userNIU;
        GetUserByNiuUseCase.process(userNIU)
            .then(user => {
                if(user !== null)
                    response.send(new Response(CODE_200, SUCCESS_MESSAGE('Get user'), user));
                else
                    next(error401(`User [NIU: ${userNIU}]`));
            });
    }

    static getAll(request, response, next)
    {
        GetAllUserUseCase.process(request.query)
            .then(users => {
                let message = SUCCESS_MESSAGE('Get users');

                if(users.length <= 0)
                    message = MANY_401_MESSAGE('users');

                response.send(new Response(CODE_200, message, users))
            })
            .catch(error => {
                next(error);
            })
    }

    static updateUserById(request, response, next)
    {
        const userId = request.params.userId;
        const data = request.body;

        UpdateUserByIdUseCase.process(userId, data, next)
            .then(updatedUser => {
                response.send(
                    new Response(CODE_200, SUCCESS_MESSAGE('Update user'), updatedUser)
                );
            })
            .catch(error => {
                console.log(error);
            })
    }

    static updateUserByNiu(request, response, next)
    {
        const userNiu = request.params.userNiu;
        const data = request.body;
        UpdateUserByNiuUseCase.process(userNiu, data, next)
            .then(updatedUser => {
                response.send(
                    new Response(CODE_200, SUCCESS_MESSAGE('Update user'), updatedUser)
                );
            })
            .catch(error => {
                next(error);
            })
    }
}

module.exports = UserController
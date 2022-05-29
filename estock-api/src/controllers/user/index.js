const {
    CreateUserUseCase,
    GetUserByIdUseCase,
    GetAllUserUseCase,
    UpdateUserByIdUseCase,
} = require('../../usecases');

const Index = require("../../../utilities/enumIndex");
const Response = require('../../output/Response');
const {Error401} = require("../../../utilities/errorUtil");
const {CODE_200, SUCCESS_MESSAGE, MANY_401_MESSAGE, SINGLE_401_MESSAGE} = require('../../../utilities/constants');

class UserController
{
    createUser(request, response, next)
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

    getUserById(request, response, next)
    {
        const userId = Number.parseInt(request.params.userId);
        GetUserByIdUseCase.process(userId)
            .then(user => {
                if(user !== null)
                    response.send(new Response(CODE_200, SUCCESS_MESSAGE('Get user'), user));
                else
                    response.send(new Response(CODE_200, SINGLE_401_MESSAGE('User'), user));
            })
            .catch(error => { next(error); })
    }

    getAll(request, response, next)
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

    getCompleteUser(request, response, next)
    {
        GetAllUserUseCase.process(request.query, )
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

    getCompleteUserWithoutOrders(request, response, next)
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

    updateUserById(request, response, next)
    {
        const userId = request.params.userId;
        const data = request.body;

        UpdateUserByIdUseCase.process(userId, data)
            .then(updatedUser => {
                response.send(
                    new Response(CODE_200, SUCCESS_MESSAGE('Update user'), updatedUser)
                );
            })
            .catch(error => {
                error.code === 'P2025' ? next(Error401("User to update")) : next(error);
            })
    }
}

module.exports = UserController
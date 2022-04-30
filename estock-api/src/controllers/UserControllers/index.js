const CreateUserUseCase = require('../../usecases/user/CreateUserUseCase');
const DeleteUserUseCase = require('../../usecases/user/DeleteUserUseCase');
const UpdateUserByIdUseCase = require('../../usecases/user/UpdateUserByIdUseCase');

const Index = require("../../../utilities/enumIndex");
const {error401} = require("../../../utilities/errorUtil");
const Response = require('../../output/Response')

const {CODE_200, SUCCESS_MESSAGE, MANY_401_MESSAGE} = require('../../../utilities/constants');

const UserDataProvider = require("../../dataproviders/UserDataProvider");
const GetAllUserUseCase = require("../../usecases/user/GetAllUserUseCase");

class UserControllers
{
    static createUser(request, response, next)
    {
        CreateUserUseCase.process(request.body)
            .then(createdUser => response.send(createdUser))
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
        UserDataProvider.getUserById(userId)
            .then(user => {
                if(user)
                    response.send(user)
                else
                    next(error401(`User [id: ${userId}]`));

            });
    }

    static getUserByNIU(request, response, next)
    {
        const userNIU = request.params.userNIU;
        UserDataProvider.getUserByNIU(userNIU)
            .then(user => {
                if(user)
                    response.send(user)
                else
                    next(error401(`User [NIU: ${userNIU}]`));

            });
    }

    static getAll(request, response, next)
    {
        const regex = request.query.params;

        GetAllUserUseCase.process(regex)
            .then(users => {
                let message = SUCCESS_MESSAGE('Get');

                if(users.length <= 0)
                    message = MANY_401_MESSAGE('users');

                response.send(new Response(CODE_200, message, users))
            })
            .catch(error => {
                console.log(error);
            })
    }

    //static getAllByRegex(regex){ }

    static updateUser(request, response, next)
    {
        const userId = request.params.userId;
        const data = request.body;

        UpdateUserByIdUseCase.process(userId, data)
            .then(updatedUser => {
                response.send(
                    new Response(200, 'User updated successfully', updatedUser)
                );
            })
            .catch(error => {
                console.log(error);
            })
    }

    //static updateAllByRegex(regex, data){}

    static deleteUser(request, response, next){

        DeleteUserUseCase.process(request.params.userId)
            .then(deletedUser => {
                response.send(new Response(200, 'User deleted successfully', deletedUser));
            })
            .catch(error => {
                console.log(error);
            })
    }

    //static deleteAllByRegex(regex){}
}

module.exports = UserControllers
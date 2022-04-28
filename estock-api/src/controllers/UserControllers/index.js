const CreateUserUseCase = require('../../usecases/user/CreateUserUseCase')

class UserControllers
{
    static createUser(request, response, next)
    {
        response.send(CreateUserUseCase.process(request.body));
    }

    static getUserById(userId)
    {

    }

    static getAll(){

    }

    static getAllByRegex(regex){

    }

    static updateUser(id, data){

    }

    static updateAllByRegex(regex, data){

    }

    static deleteUser(userId){

    }

    static deleteAllByRegex(regex){

    }
}

module.exports = UserControllers
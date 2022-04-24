const CreateUserUseCase = require('../../usecases/CreateUserUseCase')

class UserControllers
{
    static createUser(user)
    {
        return CreateUserUseCase.process(user)
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
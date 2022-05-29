const {LoginUseCase} = require("../../usecases");

const useCase = {
    login: new LoginUseCase(),
}
class LoginController {

    makeLogin(request, response, next)
    {
        useCase.login.process(request.body)
            .then(loggedUser => {
                response.send(loggedUser);
            })
            .catch(error => { next(error); })
    }

}

module.exports = LoginController;
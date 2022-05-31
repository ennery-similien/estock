const {LoginUseCase} = require("../../usecases");
const {CODE_200} = require("../../../utilities/constants");
const Response = require("../../output/Response");

const useCase = {
    login: new LoginUseCase(),
}

const status = {
    code: CODE_200,
    codeText: "STATUS_CODE_SUCCESS"
};

class LoginController {

    makeLogin(request, response, next)
    {
        useCase.login.process(request.body)
            .then(loggedUser => {
                response.send(new Response(status, "Login Successful",loggedUser));
            })
            .catch(error => { next(error); })
    }

}

module.exports = LoginController;
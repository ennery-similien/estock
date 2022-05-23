const {mysqlBdConnection} = require("../../database");

class LoginDataProvider{

    async getUserByLogin(user)
    {
        return await mysqlBdConnection.user.findUnique({
            where: {
                niu: user.login
            },
            select:{
                id: true,
                niu: true,
                password: true,
                role: true,
                firstname: true,
                lastname: true,
                email: true,
                token: true,
                isOnline: true
            }
        });
    }

}

module.exports = LoginDataProvider;
//const {DBConnection} = require(__dirname.concat('/app'))
const Response = require('../output/Response')

class UserDataProvider{
    static createUser(user){
        // const createdUser = await DBConnection.user.create({
        //     user
        // })
        //
        // if(!createdUser)
        //     new Error('An error occured, user not created')

        return new Response(200, "User created successful", user)
    }

}

module.exports = UserDataProvider
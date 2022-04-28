const Response = require('../output/Response');
const {mysqlBdConnection} = require('../../database');

class UserDataProvider{
    static async createUser(user){
        const createdUser = await mysqlBdConnection.user.create({
            data: {
                ...user,
                telephones:{
                    create: user.telephones.map(phone => ({
                            telephone: {create: phone}
                        }))
                },
                adrresses:{
                    create: user.addresses.map(address => ({
                        address: {create: address}
                    }))
                }
            }
        });

        console.log(createdUser);

        if(!createdUser)
            new Error('An error occurred, user not created')

        return new Response(200, "User created successful", createdUser)
    }

}

module.exports = UserDataProvider
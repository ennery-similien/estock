const {mysqlBdConnection} = require('../../database');

class UserDataProvider
{
    static async createUser(user){
        return await mysqlBdConnection.user.create({
            data: {
                ...user,
                telephones:{
                    create: user.telephones
                },
                addresses:{
                    create: user.addresses
                }
            },
            include:{
                telephones:true,
                addresses:true
            }
        });
    }

    static getUserById(userId)
    {
        return mysqlBdConnection.user.findUnique({
            where : {
                id : userId
            },
            include: {
                telephones: true,
                addresses: true
            }
        });
    }

    static async updateUserById(userId, data)
    {
        return await mysqlBdConnection.user.update({
            data,
            where : {
                id : userId
            }
        });
    }

    static async getAllUser(regex)
    {
        return await mysqlBdConnection.user.findMany({
            ...regex,
            // include:{
            //     telephones: true,
            //     addresses: true,
            // }
        });
    }

}


module.exports = UserDataProvider
const {mysqlBdConnection} = require('../../database');

class UserDataProvider
{
    static async createUser(user){
        const createdUser = await mysqlBdConnection.user.create({
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

        if(!createdUser)
            throw new Error('An error occurred, user not created')

        return createdUser;
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

    static getUserByNIU(userNIU)
    {
        return mysqlBdConnection.user.findUnique({
            where : {
                niu : userNIU
            },
            include: {
                telephones: true,
                addresses: true
            }
        });
    }

    static async deleteUserById(userId)
    {
        return await mysqlBdConnection.user.delete({
            where: {
                id: userId
            },
            include: {
                telephones: true,
                addresses: true
            }
        });
    }

    static async deleteUserByNIU(userNIU)
    {
        return await mysqlBdConnection.user.delete({
            where: {
                niU : userNIU
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

    static async updateUserByNIU(userNIU, data)
    {
        return await mysqlBdConnection.user.update({
            data,
            where : {
                niu : userNIU
            }
        });
    }

    static async getAllUser(regex)
    {
        return await mysqlBdConnection.user.findMany({
            include:{
                telephones: true,
                addresses: true,
                orders:{
                    include:{
                        products:{
                            include:{
                                product:true
                            }
                        }
                    }
                }
            }
        });
    }
}


module.exports = UserDataProvider
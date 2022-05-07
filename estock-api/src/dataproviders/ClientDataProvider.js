const {mysqlBdConnection} = require('../../database');

class ClientDataProvider
{
    static async createClient(client){
        const createdClient = await mysqlBdConnection.client.create({
            data: {
                ...client,
                telephones:{
                    create: client.telephones
                },
                addresses:{
                    create: client.addresses
                }
            },
            include:{
                telephones:true,
                addresses:true
            }
        });

        if(!createdClient)
            throw new Error('An error occurred, client not created')

        return createdClient;
    }

    static getClientById(clientId)
    {
        return mysqlBdConnection.client.findUnique({
            where : {
                id : clientId
            },
            include: {
                telephones: true,
                addresses: true
            }
        });
    }

    static getClientByNiu(clientNIU)
    {
        return mysqlBdConnection.client.findUnique({
            where : {
                niu : clientNIU
            },
            include: {
                telephones: true,
                addresses: true
            }
        });
    }

    static async updateClientById(clientId, data)
    {
        return await mysqlBdConnection.client.update({
            data,
            where : {
                id : clientId
            }
        });
    }

    static async updateClientByNiu(clientNIU, data)
    {
        return await mysqlBdConnection.client.update({
            data,
            where : {
                niu : clientNIU
            }
        });
    }

    static async getAllClient(regex)
    {
        return await mysqlBdConnection.client.findMany({
            ...regex,
            // include:{
            //     telephones: true,
            //     addresses: true,
            // }
        });
    }

    // static async getAllClient(regex)
    // {
    //     return await mysqlBdConnection.client.findMany({
    //         include:{
    //             telephones: true,
    //             addresses: true,
    //             orders:{
    //                 include:{
    //                     address:true,
    //                     products:{
    //                         include:{
    //                             product:true
    //                         }
    //                     },
    //                     seller: true
    //                 }
    //             }
    //         }
    //     });
    // }
}


module.exports = ClientDataProvider
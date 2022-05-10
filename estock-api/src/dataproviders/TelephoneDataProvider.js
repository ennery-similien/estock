const {mysqlBdConnection} = require("../../database");

class TelephoneDataProvider
{
    static async createTelephone(telephone)
    {
        return await mysqlBdConnection.telephone.create({
            data:telephone
        });
    }

    static async getTelephoneByOwner(owner)
    {
        return await mysqlBdConnection.telephone.findMany({
            where: {owner: owner}
        });
    }

    static async getAllTelephones(regex)
    {
        return await mysqlBdConnection.telephone.findMany({
            ...regex
        });
    }

    static async updateTelephoneById(telephoneId, data)
    {

        return await mysqlBdConnection.telephone.update({
            data: data,
            where: {id : telephoneId}
        });
    }
}

module.exports = TelephoneDataProvider;
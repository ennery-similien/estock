const {mysqlBdConnection} = require("../../database");

class AddressDataProvider
{
    static async createAddress(address)
    {
        return await mysqlBdConnection.address.create({
            data: address,
            include:{ user:true }
        });
    }

    static async getAddressByOwner(owner) {
        return await mysqlBdConnection.address.findMany({
            where : {owner : owner}
        });
    }

    static async getAllAddress(regex)
    {
        return await mysqlBdConnection.address.findMany({
            ...regex,
            include: { user: true }
            });
    }

    static async updateAddressById(addressId, data)
    {
        return await mysqlBdConnection.address.update({
            data,
            where: {id: addressId}
        });
    }

}

module.exports = AddressDataProvider;
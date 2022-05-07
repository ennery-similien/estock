const {mysqlBdConnection} = require("../../database");

class AddressDataProvider
{
    static async createAddress(address)
    {
        return await mysqlBdConnection.address.create({
            data: address,
            include:{
                user:true,
                client: true
            }
        });
    }

    static async getAddressByNiu(niu, include)
    {
        let owner = {};

        const addresses =  await mysqlBdConnection.address.findMany({
            where:{
                OR:[{userNiu: niu}, {clientNiu: niu}]
            }
        });

        if(include){
            owner = await mysqlBdConnection.user.findUnique({where : { niu: niu }})
            || await mysqlBdConnection.client.findUnique({ where : { niu: niu } });
            owner.addresses = addresses;
        }

        return {...owner, addresses}
    }

    static async getAddressById(addressId) {
        return await mysqlBdConnection.address.findUnique({
            where : {id : addressId}
        });
    }

    static async getAllAddress(regex)
    {
        return await mysqlBdConnection.address.findMany({
            ...regex
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
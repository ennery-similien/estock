const {mysqlBdConnection, exclude} = require("../../database");

class OrderDataProvider
{
    async createOrder(order, excludeFilter)
    {
        return await mysqlBdConnection.order.create({
            data:{
                ...order,
                items:{
                    create: order.items
                }
            },
            select: {
                ...exclude("order", excludeFilter || []),
                items:{
                    select: {
                        ...exclude("orderItem", excludeFilter || []),
                        product: true
                    }
                }
            }
        });
    }

}

module.exports = {
    orderDataProvider: new OrderDataProvider()
}
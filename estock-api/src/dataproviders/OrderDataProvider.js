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
                seller:{
                    select: exclude("user", excludeFilter || [])
                },
                items:{
                    select: {
                        ...exclude("orderItem", excludeFilter || []),
                        product: {
                            select: exclude("product", excludeFilter || [])
                        }
                    }
                }
            }
        });
    }

    async getOrderById(orderId, excludeFilter, selectsOptions)
    {
        return await mysqlBdConnection.order.findUnique({
            where: {
                id: orderId
            },
            select: {
                ...exclude("order", excludeFilter || []),
                ...selectsOptions
            }
        });
    }

    async getAllOrder(regex, excludeFilter, selectsOptions)
    {
        return await mysqlBdConnection.order.findMany({
            ...regex,
            select: {
                ...exclude("order", excludeFilter || []),
                ...selectsOptions
            }
        });
    }

    async updateOrderById(order, excludeFilter, selectsOptions)
    {
        return await mysqlBdConnection.order.update({
            data:order,
            where:{
                id: order.id
            },
            select:{
                ...exclude("order", excludeFilter || []),
                ...selectsOptions
            }
        });
    }

    async updateOrderAddProduct(order, excludeFilter, selectsOptions)
    {
        return await mysqlBdConnection.order.update({
            data: {
                ...order,
                items:{
                    create: order.items
                }
            },
            where:{
                id: order.id
            },
            select: {
                ...exclude("order", excludeFilter || []),
                ...selectsOptions
            }
        });
    }

    async updateOrderRemoveProduct(order, excludeFilter, selectsOptions)
    {
        return await mysqlBdConnection.order.update({
            data: {
                ...order,
                items:{
                    deleteMany: order.items.map(item => ({orderId: item.orderId, productId: item.productId}))
                }
            },
            where:{
                id: order.id
            },
            select: {
                ...exclude("order", excludeFilter || []),
                ...selectsOptions
            }
        });
    }

    async updateOrderItems(order, excludeFilter, selectsOptions)
    {
        return await mysqlBdConnection.$transaction(async (mysqlBdConnection) => {
            const items = order.items;
            delete order.items;

            for (const item of items) {
                await mysqlBdConnection.orderItem.update({
                    data: item,
                    where: {
                        orderId_productId: {
                            orderId: item.orderId,
                            productId: item.productId
                        }
                    }
                });
            }

            return await mysqlBdConnection.order.update({
                data: {
                    ...order
                },
                where:{
                    id: order.id
                },
                select:{
                    ...exclude("order", excludeFilter || []),
                    ...selectsOptions
                }
            });

        }, {
            maxWait: 5000,
            timeout: 10000
        });
    }

}

module.exports = {
    orderDataProvider: new OrderDataProvider()
}
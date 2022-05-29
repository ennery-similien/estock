const {mysqlBdConnection, exclude} = require("../../database");

class ProductDataProvider
{
    async createProduct(product)
    {
        return await mysqlBdConnection.product.create({
            data: {
                ...product,
                orders:{
                    create: product.orders
                }
            },
            select: exclude("product", ["createdAt", "updatedAt"])
        });
    }

    async getProductById(productId) {
        return await mysqlBdConnection.product.findUnique({
            where: {id: productId},
            select: exclude("product", ["createdAt", "updatedAt"])
        });
    }

    async getProductByBarcode(productBarcode) {
        return await mysqlBdConnection.product.findUnique({
            where: {barcode: productBarcode},
            select: exclude("product", ["createdAt", "updatedAt"])
        });
    }

    async getAllProducts(regex) {
        return await mysqlBdConnection.product.findMany({
            ...regex,
            select: exclude("product", [])
        });
    }

    async getAllProductsWithOrders(regex) {
        return await mysqlBdConnection.product.findMany({
            ...regex,
            select: {
                ...exclude("product", []),
                orders: true
            }
        });
    }

    async updateProductByBarcode(product)
    {
        return await mysqlBdConnection.product.update({
            data: product,
            where: { id: product.id},
            select: exclude("product", [])
        });
    }
}

module.exports = {provider: new ProductDataProvider()};
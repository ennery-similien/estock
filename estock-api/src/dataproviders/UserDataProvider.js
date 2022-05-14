const {mysqlBdConnection, exclude} = require('../../database');

class UserDataProvider {
    static async createUser(user, excludeFilter) {
        return await mysqlBdConnection.user.create({
            data: {
                ...user,
                telephones: {
                    create: user.telephones
                },
                addresses: {
                    create: user.addresses
                },
                orders: {
                    create: user.orders
                }
            },
            select: {
                ...exclude("user", excludeFilter || []),
                telephones: {
                    select: exclude("telephone", excludeFilter || [])
                },
                addresses: {
                    select: exclude("address", excludeFilter || [])
                }
            }
        });
    }

    static getUserById(userId, excludeFilter) {
        return mysqlBdConnection.user.findUnique({
            where: {
                id: userId
            },
            select: {
                ...exclude("user", excludeFilter || []),
                telephones: {
                    select: exclude("telephone", excludeFilter || [])
                },
                addresses: {
                    select: exclude("address", excludeFilter || [])
                }
            }
        });
    }

    static async updateUserById(user, excludeFilter) {
        return await mysqlBdConnection.user.update({
            data: {
                ...user,
                telephones: {
                    create: user.telephones
                },
                addresses: {
                    create: user.addresses
                }
            },
            where: {
                id: user.id
            },
            select: {
                ...exclude("user", excludeFilter || []),
                telephones: {
                    select: exclude("telephone", excludeFilter || [])
                },
                addresses: {
                    select: exclude("address", excludeFilter || [])
                }
            }
        });
    }

    static async getAllUser(regex, excludeFilter) {
        return await mysqlBdConnection.user.findMany({
            ...regex,
            select: exclude("user", excludeFilter || [])
        });
    }

    static async getCompleteUser(regex, excludeFilter) {
        return await mysqlBdConnection.user.findMany({
            ...regex,
            select: {
                ...exclude("user", excludeFilter || []),
                telephones: {
                    select: exclude("telephone", excludeFilter || [])
                },
                addresses: {
                    select: exclude("address", excludeFilter || [])
                },
                orders: {
                    select: exclude("order", excludeFilter || [])
                }
            }
        });
    }

    static async getCompleteUserWithoutOrders(regex, excludeFilter) {
        return await mysqlBdConnection.user.findMany({
            ...regex,
            select: {
                ...exclude("user", excludeFilter || []),
                telephones: {
                    select: exclude("telephone", excludeFilter || [])
                },
                addresses: {
                    select: exclude("address", excludeFilter || [])
                }
            }
        });

    }
}

module.exports = UserDataProvider
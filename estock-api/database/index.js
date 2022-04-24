const mongoose = require('mongoose');
const {PrismaClient} = require('@prisma/client')
const prismaLogParams = [
    { level: 'warn', emit: 'event' },
    { level: 'info', emit: 'event' },
    { level: 'error', emit: 'event' },
    {level: 'query', emit: 'event'}
];

mongoose.connect(process.env.MONGO_DB_URL, { autoIndex: false }, (error) =>{});

module.exports = {
    mongoose: mongoose,
    mongodbConnection: mongoose.connection,
    mysqlBdConnection: new PrismaClient({log: prismaLogParams})
}
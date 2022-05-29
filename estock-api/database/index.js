const mongoose = require("mongoose");
const {PrismaClient} = require("@prisma/client");
const {prismaExclude} = require("prisma-exclude");

const prismaLogParams = [
    { level: 'warn', emit: 'event' },
    { level: 'info', emit: 'event' },
    { level: 'error', emit: 'event' },
    {level: 'query', emit: 'event'}
];

const mysqlDatabase = new PrismaClient({log: prismaLogParams});
const exclude = prismaExclude(mysqlDatabase);

mongoose.connect(process.env.MONGO_DB_URL, { autoIndex: false }, (error) =>{});

module.exports = {
    mongoose: mongoose,
    mongodbConnection: mongoose.connection,
    mysqlBdConnection: mysqlDatabase,
    exclude: exclude
}
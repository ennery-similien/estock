const app = require('./app')
const logger = require('./logger')
require('dotenv').config();
const {notFoundError, error} = require('./midleware/errorHandler')
const {mongoose, mysqlBdConnection} = require('./database')

app.use('/api/v1', require('./src/routes/api.route'));

app.use(notFoundError);
app.use(error);

const server = app.listen(process.env.SERVER_PORT);

const prettyPrismaErrorMessage = function (error){
    return `[${error.code ? 'PrismaClientKnownRequestError' : 'PrismaClientInitializationError'}]`
        .concat(error.message.substring(
        error.message.lastIndexOf('\n') + 1
    ))
}
mysqlBdConnection.user.findMany({}).then(result => {
    console.log(result)
}).catch(error => {
    logger.error(prettyPrismaErrorMessage(error))
})

if(server.listening)
{
    logger.info(`Server running @ http://localhost:${process.env.SERVER_PORT}`);

    mongoose.connection.on('error', (error) => {
        logger.info(`Mongodb connection error: ${error.message}`)
        server.close(() => {
            logger.info('Server shut down')
        });
    });
    mongoose.connection.on('connected', () => {
        logger.info('Mongodb connected successful')
    });

    mysqlBdConnection.$on('query', (query) => {
        logger.info(query.query)
    })

    mysqlBdConnection.$on('info', (info) => {
        logger.info(info.message)
    })
}
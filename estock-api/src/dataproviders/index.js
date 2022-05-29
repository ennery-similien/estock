const UserDataProvider = require('./UserDataProvider');
const AddressDataProvider = require('./AddressDataProvider');
const TelephoneDataProvider = require("./TelephoneDataProvider");
const {provider} = require('./ProductDataProvider');
const {orderDataProvider} = require('./OrderDataProvider');
const LoginDataProvider = require('./LoginDataProvider');

module.exports ={
    UserDataProvider,
    AddressDataProvider,
    TelephoneDataProvider,
    provider,
    orderDataProvider,
    LoginDataProvider,
}
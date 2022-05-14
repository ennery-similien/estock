const UserDataProvider = require('./UserDataProvider');
const AddressDataProvider = require('./AddressDataProvider');
const TelephoneDataProvider = require("./TelephoneDataProvider");
const {provider} = require('./ProductDataProvider');

module.exports ={
    UserDataProvider,
    AddressDataProvider,
    TelephoneDataProvider,
    provider,
}
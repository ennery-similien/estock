const {UserDataProvider, ClientDataProvider} = require("../../dataproviders");

module.exports = {
    userExistsOnId(userId)
    {
        return UserDataProvider.getUserById(userId)
            .then(user => { return !!user; });
    },
    userExistsOnNiu(userNiu)
    {
        return UserDataProvider.getUserByNiu(userNiu)
            .then((user) => { return !!user; })
    },
    clientExistsOnId(clientId)
    {
        return ClientDataProvider.getClientById(clientId)
            .then(client => { return !!client; });
    },
    clientExistsOnNiu(clientNiu)
    {
        return ClientDataProvider.getClientByNiu(clientNiu)
            .then((client) => { return !!client; })
    }
}
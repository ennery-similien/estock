const {ClientDataProvider} = require("../../dataproviders");
const {isHumanName, isNumeric, isSameDigitSequence, isAdult, isEmail} = require('../../../utilities');
const DateUtils = require("../../../utilities/DateUtils");
const {AddressType, PhoneType} = require("../../../utilities/enumerations");

class CreateClientUseCase {

    static process(client) {
        client.birthday = new Date(client.birthday);

        CreateClientUseCase.#validateClient(client);

        return ClientDataProvider.createClient(client);
    }

    static #validateClient(client)
    {
        CreateClientUseCase.#checkClientNiu(client.niu);
        CreateClientUseCase.#checkClientFullName(client.fullname);
        CreateClientUseCase.#checkClientBirthday(client.birthday);
        CreateClientUseCase.#checkEmail(client.email);
        CreateClientUseCase.#checkTelephones(client.telephones);
        CreateClientUseCase.#checkAddresses(client.addresses);
    }

    static #checkClientNiu(niu)
    {
        if(!niu  || !isNumeric(niu))
            throw new Error('Invalid Unique Identity Number, must be only digit[0-9]');

        if(niu.length !== 10)
            throw new Error('Unique Identity Number must contain exactly 10 digits');

        if(isSameDigitSequence(niu))
            throw new Error('Invalid NIU sequence');

        //TODO orther verifications here
    }

    static #checkClientFullName(fullname)
    {
        if(!fullname || !isHumanName(fullname))
            throw new Error('Incorrect client name');
    }

    static #checkClientBirthday(birthday)
    {
        if(!DateUtils.isValidDate(birthday))
            throw new Error('Invalid birthday date');

        if(!isAdult(birthday))
            throw new Error('Only adult is allowed');
    }

    static #checkEmail(email)
    {
        if(!email) return;

        if(!isEmail(email))
            throw new Error('Invalid e-mail format');
    }

    static #checkTelephones(telephones)
    {
        if(telephones.length <= 0)
            throw new Error('Client must contain at least one telephone');

        telephones.forEach(phone => {
            if(phone.number.length !== 8 || !isNumeric(phone.number))
                throw new Error('Invalid phone number, must contain 8 digits');

            if(!phone.type)
                phone.type = PhoneType.RESIDENTIAL;
        });
    }

    static #checkAddresses(addresses)
    {
        if(addresses.length <= 0)
            throw new Error('Client must contain at least one address');

        addresses.forEach(address => {

            if(!address.addressLine || !address.city || !address.state)
                throw new Error('Invalid address, please enter a correct address');

            if(!address.type)
                address.type = AddressType.RESIDENTIAL;
        });

        if(!addresses.find(address => address.isPrimary === true))
            addresses[0].isPrimary = true
    }
}

module.exports = CreateClientUseCase;
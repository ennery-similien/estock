const UserDataProvider = require("../../dataproviders/UserDataProvider");
const {isHumanName, isNumeric, isSameDigitSequence, isAdult, isEmail, Regexp} = require('../../../utilities');
const DateUtils = require("../../../utilities/DateUtils");
const {REGEX_PASSWORD, PASSWORD_OPTIONS} = require("../../../utilities/constants");
const {Role, AddressType, PhoneType} = require("../../../utilities/enumerations");
const passwordHash = require('password-hash');

class CreateUserUseCase {

    static process(user) {
        user.birthday = new Date(user.birthday);

        CreateUserUseCase.#validateUser(user);

        if (!user.role)
            user.role = Role.SALESMAN;

        CreateUserUseCase.#setUserPasswordHash(user);

        user.isActive = false;

        return UserDataProvider.createUser(user);
    }

    static #setUserPasswordHash(user)
    {
        const hashedPassword = passwordHash.generate(user.password, PASSWORD_OPTIONS);

        if(!hashedPassword)
            throw new Error('An error occurred, please try again');

        user.password = hashedPassword;
    }

    static #validateUser(user)
    {
        CreateUserUseCase.#checkUserNiu(user.niu);
        CreateUserUseCase.#checkUserFullName(user.firstname, user.lastname);
        CreateUserUseCase.#checkUserBirthday(user.birthday);
        CreateUserUseCase.#checkEmail(user.email);
        CreateUserUseCase.#checkPassword(user.password);
        CreateUserUseCase.#checkTelephones(user.telephones);
        CreateUserUseCase.#checkAddresses(user.addresses);

    }

    static #checkUserNiu(niu)
    {
        if(!niu  || !isNumeric(niu) || niu.length !== 10)
            throw new Error('Invalid Unique Identity Number, must be only digit[0-9]');

        if(isSameDigitSequence(niu))
            throw new Error('Invalid NIU sequence');

        //TODO orther verifications here
    }

    static #checkUserFullName(firstname, lastname)
    {
        if(!firstname || !isHumanName(firstname))
            throw new Error('Incorrect user firstname');

        if(!lastname || !isHumanName(lastname))
            throw new Error('Incorrect user lastname');
    }

    static #checkUserBirthday(birthday)
    {
        if(!DateUtils.isValidDate(birthday))
            throw new Error('Invalid birthday date');

        if(!isAdult(birthday))
            throw new Error('Only adult is allowed');
    }

    static #checkEmail(email)
    {
        if(!isEmail(email))
            throw new Error('Invalid e-mail format');
    }

    static #checkPassword(password)
    {
        if(!password || password.length < 10 || !Regexp(REGEX_PASSWORD).test(password))
            throw new Error('Password must contain 10-15 characters, at least 1 uppercase, one lowercase, 1 number and 1 special character');
    }

    static #checkTelephones(telephones)
    {
        if(telephones.length <= 0)
            throw new Error('User must contain at least one telephone');

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
            throw new Error('User must contain at least one address');

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

module.exports = CreateUserUseCase;
const {Role, AddressPhoneType} = require("@prisma/client");
const {validateNiu, validateTelephone, validateAddress} = require("../../../utilities/validator");
const {isHumanName, isAdult, isEmail, Regexp} = require("../../../utilities");
const DateUtils = require("../../../utilities/DateUtils");
const {REGEX_PASSWORD} = require("../../../utilities/constants");

class UserValidator
{
    validate(user)
    {
        UserValidator.#setUserRole(user);
        UserValidator.#checkUserNiu(user.niu);
        UserValidator.#checkUserFullName(user.firstname, user.lastname);
        UserValidator.#checkUserBirthday(user.birthday);
        UserValidator.#checkUserInitDay(user.initDay);
        UserValidator.#checkEmail(user.email);
        UserValidator.#checkPassword(user.password);
        this.#checkTelephones(user.telephones);
        this.#checkAddresses(user.addresses);
    }

    static #setUserRole(user)
    {
        if (!user.role)
            user.role = Role.SALESMAN;
    }

    static #checkUserNiu(niu)
    {
        validateNiu(niu);

        //TODO other verifications here
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
        if(!birthday) return;

        if(!DateUtils.isValidDate(birthday))
            throw new Error('Invalid birthday date');

        if(!isAdult(birthday))
            throw new Error('Only adults are allowed');
    }

    static #checkUserInitDay(initDay)
    {
        if(!initDay) return;

        if(!DateUtils.isValidDate(initDay))
            throw new Error("User initial date  must be a valid date");
    }

    static #checkEmail(email)
    {
        if(!email) return;

        if(!isEmail(email))
            throw new Error('Invalid e-mail format');
    }

    static #checkPassword(password)
    {
        if(!password) return;

        if(!password || password.length < 10 || !Regexp(REGEX_PASSWORD).test(password))
            throw new Error('Password must contain 10-15 characters, at least 1 uppercase, one lowercase, 1 number and 1 special character');
    }

    #checkTelephones(telephones)
    {
        if(telephones.length <= 0) return;

        telephones.forEach(telephone => {
            validateTelephone(telephone);
            telephone.type = telephone.type || AddressPhoneType.RESIDENTIAL
        });
    }

    #checkAddresses(addresses)
    {
        if(addresses.length <= 0) return;

        addresses.forEach(address => {
            validateAddress(address);
            address.type = address.type || AddressPhoneType.RESIDENTIAL
        });

        if(!addresses.find(address => address.isPrimary === true))
            addresses[0].isPrimary = true
    }
}

module.exports = UserValidator;
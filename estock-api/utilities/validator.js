const {isNumeric, isSameDigitSequence, isObjectEmpty} = require("./index");
module.exports = {
    validateAddress(address)
    {
        if(!address.address)
            throw new Error('Invalid address line, cannot be empty or null');

        if(!address.city)
            throw new Error('Invalid city, cannot be empty or null');

        if(!address.state)
            throw new Error('Invalid state, cannot be empty or null');
    },
    validateTelephone(telephone)
    {
        if(isObjectEmpty(telephone))
            throw new Error("Telephone must contain a valid phone number");

        if(telephone.number === null)
            throw new Error("Telephone number must not be null");

        if(telephone.number.length !== 8 || !isNumeric(telephone.number))
            throw new Error('Invalid phone number, must contain 8 digits');
    },
    validateNiu(niu)
    {
        if(!niu  || !isNumeric(niu))
            throw new Error('Invalid Unique Identity Number, sequence must be only digit[0-9]');

        if(niu.length !== 10)
            throw new Error('Unique Identity Number must contain 10 digits');

        if(isSameDigitSequence(niu))
            throw new Error('Invalid NIU sequence');
    },
    validateUniqueId(input)
    {
        if(input.id !== undefined)
            throw new Error("[Invalid Argument]: Cannot set auto generate unique key, id must be undefined");
    },
    validateData(data, message)
    {
        if(data === null || data === undefined)
            throw new Error(`[Invalid Value]: ${message}`);
    }
}
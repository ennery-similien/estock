const {AddressType, PhoneType} = require("./enumerations");
const {isNumeric, isSameDigitSequence} = require("./index");
module.exports = {
    validateAddress(address)
    {
        if(!address.address || !address.city || !address.state)
            throw new Error('Invalid address, please enter a correct address');

        if(!address.type)
            address.type = AddressType.RESIDENTIAL
    },
    validateTelephone(telephone)
    {
        if(telephone.number.length !== 8 || !isNumeric(telephone.number))
            throw new Error('Invalid phone number, must contain 8 digits');

        if(!telephone.type)
            telephone.type = PhoneType.RESIDENTIAL;
    },
    validateNiu(niu)
    {
        if(!niu  || !isNumeric(niu))
            throw new Error('Invalid Unique Identity Number, sequence must be only digit[0-9]');

        if(niu.length !== 10)
            throw new Error('Unique Identity Number must contain 10 digits');

        if(isSameDigitSequence(niu))
            throw new Error('Invalid NIU sequence');
    }
}
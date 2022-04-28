const DateUtils = require("./DateUtils");
const {REGEX_EMAIL} = require("./constants");
module.exports = {
    isObjectEmpty(object)
    {
        return Object.getPrototypeOf(object) === Object.prototype &&
                Object.entries(object).length === 0 &&
                JSON.stringify(object) === JSON.stringify({});
    },
    isNumeric(text)
    {
        return text && text.match(/^[0-9]+$/);
    },
    isAlpha(text){
        return text && text.toUpperCase().match(/^[A-Z]+$/m);
    },
    isAlphaNum(text)
    {
        return text && text.toUpperCase().match(/^[A-Z0-9]+$/m);
    },
    isHumanName(text)
    {
        return text && text.toUpperCase().match(/^(?=.{3,50}$)[A-Z]+(?:[.-\\s][A-Z]*)*$/)
    },
    isSameDigitSequence(text)
    {const regex = new RegExp(/(.)\1+/);
        console.log(text, text.match(regex))
        return text && text.match(/^([0-9])\1*$/)
    },
    isAdult(date)
    {
        const today = DateUtils.onlyDate(new Date());
        const age = today.getFullYear() - date.getFullYear();

        return age >= 18;
    },
    isEmail(text)
    {
        return text && text.toLowerCase().match(REGEX_EMAIL);
    }
}
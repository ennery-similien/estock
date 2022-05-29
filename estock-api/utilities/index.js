const DateUtils = require("./DateUtils");
const {REGEX_EMAIL, REGEX_HUMAN_NAME, REGEX_ALPHA_NUM, REGEX_SAME_DIGITS, REGEX_ALPHA, REGEX_NUMERIC} = require("./constants");

const Regexp = (regex) => new RegExp(regex);

module.exports = {
    isObjectEmpty(object)
    {
        return Object.getPrototypeOf(object) === Object.prototype &&
                Object.entries(object).length === 0 &&
                JSON.stringify(object) === JSON.stringify({});
    },
    objectKeyExits(object, key)
    {
        return object.hasOwnProperty(key);
    },
    isNumeric(text)
    {
        return (text && Regexp(REGEX_NUMERIC).test(text));
    },
    isAlpha(text){
        return (text && Regexp(REGEX_ALPHA).test(text.toUpperCase()));
    },
    isAlphaNum(text)
    {
        return (text && Regexp(REGEX_ALPHA_NUM).test(text.toUpperCase()));
    },
    isHumanName(text)
    {
        return (text && Regexp(REGEX_HUMAN_NAME).test(text.toUpperCase()));
    },
    isSameDigitSequence(text)
    {
        return Regexp(REGEX_SAME_DIGITS).test(text);
    },
    isAdult(date)
    {
        const today = DateUtils.onlyDate(new Date());
        const age = today.getFullYear() - date.getFullYear();

        return age >= 18;
    },
    isEmail(text)
    {
        return text && Regexp(REGEX_EMAIL).test(text.toLowerCase());
    },
    isString(text)
    {
        return typeof text === 'string' || text instanceof String;
    },
    Regexp
}
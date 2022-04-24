module.exports = {
    isObjectEmpty(object)
    {
        return Object.getPrototypeOf(object) === Object.prototype &&
                Object.entries(object).length === 0 &&
                JSON.stringify(object) === JSON.stringify({});
    },
    isNumeric(text)
    {
        return text && text.match("/^[0-9]+$/");
    },
    isAlpha(text){
        return text && text.toUpperCase().match("/^[A-Z]+$/m");
    },
    isAlphaNum(text)
    {
        return text && text.toUpperCase().match("/^[A-Z0-9]+$/m");
    },
    isHumanName(text)
    {
        return text && text.toUpperCase().match("/^(?=.{3,50}$)[A-Z]+(?:[.-\\s][A-Z]*)*$/")
    }
}
module.exports = {
    REGEX_EMAIL: "^(([^<>()+*[\\]\\\\.,;:\\s@\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\"]+)*)|(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$",
    REGEX_PASSWORD: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{10,15}$",
    REGEX_HUMAN_NAME: "^(?=.{3,50}$)[A-Z]+(?:[.-\\s][A-Z]*)*$",
    REGEX_ALPHA_NUM: "^[A-Z0-9]+$",
    REGEX_SAME_DIGITS: "^([0-9])\\1*$",
    REGEX_ALPHA: "^[A-Z]+$",
    REGEX_NUMERIC: "^[0-9]+$",
    PASSWORD_OPTIONS: {algorithm: 'sha1', saltLength: 10},

    CODE_200: 200,
    CODE_401: 401,
    SUCCESS_MESSAGE: (target) => '%s operation successful'.replace('%s', target),
    ERROR_MESSAGE: (target) => '%s operation failed'.replace('%s', target),
    SINGLE_401_MESSAGE: (target) => '%s not found'.replace('%s', target),
    MANY_401_MESSAGE: (target) => 'No %s found'.replace('%s', target)


}
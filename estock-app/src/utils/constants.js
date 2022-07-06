export const Regex = {
    REGEX_EMAIL: "^(([^<>()+*[\\]\\\\.,;:\\s@\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\"]+)*)|(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$",
    REGEX_PASSWORD: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{10,15}$",
    REGEX_HUMAN_NAME: "^(?=.{3,50}$)[A-Z]+(?:[.-\\s][A-Z]*)*$",
    REGEX_ALPHA_NUM: "^[A-Z0-9]+$",
    REGEX_SAME_DIGITS: "^([0-9])\\1*$",
    REGEX_ALPHA: "^[A-Z]+$",
    REGEX_NUMERIC: "^[0-9]+$",
};

export const API_BASE_URL = "http://localhost:9000/api/v1";
export const status = {
    CODE_ERROR: "STATUS_CODE_ERROR",
    CODE_SUCCESS: "STATUS_CODE_SUCCESS"
}
export const KEYS = {
    SESSION_KEY: "5c670690e10311ecb4578f6138b3052a",
    TOKEN_KEY: "3d9e7150e10611ec9f1c09580d191b9a"
};

export default Regex;


import {Regex} from "./constants";

const Regexp = (regex) => new RegExp(regex);

const loginUtil = {
    validate: function(login)
    {
        if(Regexp(Regex.REGEX_SAME_DIGITS).test(login))
            throw new Error("Invalid sequence");

        if(login.length < 10)
            throw new Error("Login must contain exactly 10 digits");
    }
}

export default loginUtil;
class RegexBuilder {

    constructor(regex)
    {
        this.regex = new RegExp(regex);
    }
    test(text)
    {
        return this.regex.test(text);
    }
}

module.exports = RegexBuilder;
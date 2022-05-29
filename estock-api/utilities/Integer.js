class Integer{
    constructor(value)
    {
        this.value = value;
    }

    isEnter(min, max)
    {
        return min <= this.value && this.value <= max;
    }
}
module.exports = Integer;
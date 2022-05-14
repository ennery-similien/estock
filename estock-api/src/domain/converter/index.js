const {isString} = require("../../../utilities");

class ClassConverter
{
    from(inputData)
    {
        for(const [key, value] of Object.entries(inputData))
            if(this.#keyExits(key))
                this[key] = this.#valueExits(value) ? value : null;
        return this;
    }

    #keyExits(key)
    {
        return this.hasOwnProperty(key);
    }

    #valueExits(value)
    {
        if(typeof value === 'boolean') return true;

        if(!value) return false;

        if(isString(value)) return value.trim() !== "";

        return true;
    }
}

module.exports = {ClassConverter};
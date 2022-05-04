class Params{
    constructor() {
        this.skip = 0;
        this.take = 0;
        this.orderBy = [];
        this.having = {};
        this.where = {};
    }
}

module.exports = Params;
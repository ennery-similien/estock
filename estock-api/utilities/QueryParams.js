const Params = require("./Params");

class QueryParams
{
    queryParams = new Params();

    static builder() {
        return new QueryParams()
    }

    skip(skip) {
        this.queryParams.skip = Number.parseInt(skip);

        return this;
    }

    take(take) {
        this.queryParams.take = Number.parseInt(take);

        return this;
    }

    orderBy(orderBy) {
        this.queryParams.orderBy = this.#generateOrderBy(orderBy);

        return this;
    }

    having(having){
        this.queryParams.having = having;

        return this;
    }

    where(where){
        this.queryParams.where = {AND: this.#generateWhere(where)};

        return this;
    }

    build()
    {
        return this.queryParams;
    }


    #generateWhere(where) {
        return where.split('|').map(condition => {
            return JSON.parse(`{${condition}}`);
        });
    }

    #generateOrderBy(orderBy) {
        return orderBy.split('|').map(order => {
            return JSON.parse(`{${order}}`);
        });
    }
}

module.exports = QueryParams;
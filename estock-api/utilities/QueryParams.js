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

    where(where, connectivity){

        if(connectivity.toUpperCase() === 'OR')
            this.queryParams.where = {OR: this.#generateWhere(where)};

        else if(connectivity.toUpperCase() === 'NOT')
            this.queryParams.where = {NOT: this.#generateWhere(where)};

        else
            this.queryParams.where = {AND: this.#generateWhere(where)};

        return this;
    }

    build()
    {
        return this.queryParams;
    }


    #generateWhere(where) {
        const conditions = where.trim().split('|').map(function (condition) {
            const key = condition.substring(0, condition.indexOf(':'));
            const value = condition.substring(condition.indexOf(':') + 1);

            return JSON.parse(`{"${key}":"${value}"}`);
        });

        conditions.forEach(condition => {
            for (const [key, value] of Object.entries(condition)) {
                if(value === 'true')
                    condition[key] = true;
                else if (value === 'false')
                    condition[key] = false;
            }
        });

        return conditions;
    }

    #generateOrderBy(orderBy) {
        return orderBy.trim().split('|').map(order => {

            const orderSplit = order.split(':');

            return JSON.parse(`{"${orderSplit[0]}":"${orderSplit[1]}"}`);
        });
    }
}

module.exports = QueryParams;
const { paginate, paginateAggregate } = require('./paginate');

function Schema(schema, options) {

    //mongoose.Schema.apply(this, arguments);

    schema.query.fail = async function (ctx) {


        let model = await this.exec();


        if (!model) {

            return ctx.throw(404, this.model.modelName + ' not found');
        }

        return model;

    }

    schema.query.paginate = function (ctx) {

        return paginate(this, ctx.query.page, ctx.PER_PAGE || 15);

    };

    schema.query.paginateAggregate = function (ctx) {

        return paginateAggregate(this, ctx.query.page, ctx.PER_PAGE || 15);

    };

}

module.exports = Schema;

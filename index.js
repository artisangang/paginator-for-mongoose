const mongoose = require('mongoose');
const plugin = require('./src/schema');

const { paginate, paginateAggregate } = require('./src/paginate');
module.exports.plugin = Schema;

const enablePlugin = () => {

    mongoose.plugin(Schema);

}

module.exports = { paginate, paginateAggregate, plugin, enablePlugin };
const plugin = require('./src/schema');

const { paginate, paginateAggregate, paginateById, paginateAggregateById } = require('./src/paginate');

const enablePlugin = (mongoose) => {

    mongoose.plugin(plugin);

}

module.exports.plugin = plugin;

module.exports = { paginate, paginateAggregate, plugin, enablePlugin, paginateById, paginateAggregateById };

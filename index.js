const mongoose = require('mongoose');
const plugin = require('./src/schema');

const { paginate, paginateAggregate } = require('./src/paginate');
module.exports.plugin = plugin;

const enablePlugin = () => {

    mongoose.plugin(plugin);

}

module.exports = { paginate, paginateAggregate, plugin, enablePlugin };
const mongoose = require('mongoose');

function paginate(model, page = 1, limit = 50) {
    //@ts-ignore
    page = Math.max(0, parseInt(page) - 1);
    //@ts-ignore
    limit = parseInt(limit);


    // clone query
    let query = model.toConstructor();

    // return promise
    return new Promise((resolve, reject) => {

        Promise.all([
            model.countDocuments(),
            query().skip(limit * page).limit(limit)

        ]).then(function (results) {

            resolve({
                totalRecords: results[0],
                currentPage: (page + 1),
                totalPages: Math.ceil(results[0] / limit),
                itemsPerPage: limit,
                data: results[1]
            });

        }).catch(reject);


    });
}

function paginateById(model, id = null, limit = 50) {
    //@ts-ignore
    limit = parseInt(limit);
    // clone query
    let query = model.toConstructor();

    const conditions = query()._conditions;

    if (id) {
        conditions._id = { $gt: mongoose.Types.ObjectId(id) };
    }
    // return promise
    return new Promise((resolve, reject) => {
        query(conditions).limit(limit + 1)
            .then((docs) => {
                let hasMore = false;
                if (docs.length > limit) {
                    hasMore = true;
                }
                docs.pop();
                resolve({
                    data: docs,
                    hasMore,
                    limit,
                })
            })
            .catch(reject)
    });
}

function paginateAggregateById(aggregate, id = null, limit = 50) {
    //@ts-ignore
    limit = parseInt(limit);

    if (id) {
        aggregate._pipeline.unshift(
            {
                $match: {
                    _id: { $gt: mongoose.Types.ObjectId(id) },
                },
            }
        );
    }

    let query = mongoose.model(aggregate._model.modelName).aggregate(aggregate._pipeline);

    // return promise
    return new Promise((resolve, reject) => {
        query.limit(limit + 1).then(function (docs) {
            let hasMore = false;
            if (docs.length > limit) {
                hasMore = true;
            }
            docs.pop();
            resolve({
                data: docs,
                hasMore,
                limit,
            })
        }).catch(reject);
    });
}

function paginateAggregate(aggregate, page = 1, limit = 50) {
    //@ts-ignore
    page = Math.max(0, parseInt(page) - 1);

    //@ts-ignore
    limit = parseInt(limit);


    let query = mongoose.model(aggregate._model.modelName).aggregate(aggregate._pipeline);
    let countQuery = mongoose.model(aggregate._model.modelName).aggregate(aggregate._pipeline);

    // if (query.hasOwnProperty('options')) {
    //     query.options = aggregate.options
    //     countQuery.options = aggregate.options
    // }

    // return promise
    return new Promise((resolve, reject) => {

        Promise.all([
            countQuery.group({ _id: null, count: { $sum: 1 } }).exec(),
            query.skip(limit * page).limit(limit)
        ]).then(function (results) {


            let count = 0;

            if (results[0].length) {
                count = results[0][0].count;
            }

            resolve({
                totalRecords: count,
                currentPage: (page + 1),
                totalPages: Math.ceil(count / limit),
                itemsPerPage: limit,
                data: results[1]
            });

        }).catch(reject);


    });
}

module.exports = { paginate, paginateAggregate, paginateById, paginateAggregateById };

# Paginator For Mongoose

This library provides elegent way to paginate both simple and aggregate mongoose query.

## Installation

```shell
npm install --save paginator-for-mongoose
```

## Usage

Simple Query

```javascript

const {paginate} = require('paginator-for-mongoose');

// usage with some mongoose model

let page = 1;

// limit is optional
const limit = 15;

const results = await paginate(Model.find({status: 'active'}), page, limit);

```

With Aggregate

```javascript

const {paginateAggregate} = require('paginator-for-mongoose');

// usage with some mongoose model

let page = 1;

// limit is optional
const limit = 15;

const results = await paginateAggregate(Model.aggregate([{ $match: {status: 'active'} }]), page, limit);

```

Plugin currently only supports koa js.

```javascript

const {enablePlugin} = require('paginator-for-mongoose');

// call this method to use schema plugin
enablePlugin();

// example usage in koajs controller

let page = 1;

// limit is optional
const limit = 15;

const results = await Model.aggregate([{ $match: {status: 'active'} }]).paginateAggregate(ctx);

// or for simple query
const results = await Model.find({status: 'active'}).paginate(ctx);

```
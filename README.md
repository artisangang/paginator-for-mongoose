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

Usage with Koa

```javascript
const mongoose = require('mongoose');
const {enablePlugin, plugin} = require('paginator-for-mongoose');

// call this method to use schema plugin
enablePlugin(mongoose);

// or you can enable like mongoose.plugin(plugin);

// example usage in koajs controller

let page = 1;

// limit is optional, by default 15 items per page
// to change limit set ctx.PER_PAGE = 50, this will set 50 items per page

const results = await Model.aggregate([{ $match: {status: 'active'} }]).paginateAggregate(ctx);

// or for simple query
const results = await Model.find({status: 'active'}).paginate(ctx);

```

Using plugin on specific models
```javascript
const mongoose = require('mongoose');
const {plugin} = require('paginator-for-mongoose');


Model.plugin(plugin);

// example usage in koajs controller

let page = 1;

// limit is optional
const limit = 15;

const results = await Model.aggregate([{ $match: {status: 'active'} }]).paginateAggregate(ctx);

// or for simple query
const results = await Model.find({status: 'active'}).paginate(ctx);

```
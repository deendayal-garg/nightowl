'use strict';

var StoreModel = require('../models/stores');
var TagModel = require('../models/tags');
var logger = require("winston").loggers.get("logger");
var url = require('url');

exports.getSearchResultForQuery = function (req, res, next) {
    var url_parts = url.parse(req.url, true);

    var storeOrTagName = url_parts.query.searchText;

    logger.info("%s, %s, %s", __file, __function, __line);

    StoreModel.findTypeAhead(storeOrTagName, function (err, stores) {
        if (err) {
            res.statusCode = 404;
            var message = 'No stores found for the given name ';
            res.send({response_codes: 404, message: message});
        }
        else {
            res.statusCode = 200;
            res.send(stores);
        }
    });
};

exports.getAllShopsForQuery = function (req, res, next) {
    var url_parts = url.parse(req.url, true);

    var storeOrTagName = url_parts.query.searchText;

    logger.info("%s, %s, %s", __file, __function, __line);

    StoreModel.findStore(storeOrTagName, function (err, stores) {
        if (err) {
            res.statusCode = 404;
            var message = 'No stores found for the given name ';
            res.send({response_codes: 404, message: message});
        }
        else {
            extendStoreWithTagName(stores, function (result) {
                res.statusCode = 200;
                res.send(result);
            });
        }
    });
};


var extendStoreWithTagName = function (stores, callback) {
    console.log("Inside extend");
    var result = [];
    var itemsProcessed = 0;
    stores.forEach(function (element, index, array) {
        console.log("Inside for each");
        TagModel.findTagsForStore(array[index]._id, function (err, tags) {
            if (err) {
                console.log(err);
            }
            else {
                var temp = {};
                temp.store = array[index];
                temp.tags = tags;
                result.push(temp);
            }
            itemsProcessed++;
            if (itemsProcessed === stores.length)
                callback(result);
        });
    });
};

exports.addStore = function (req, res, next) {
    logger.info("Insert a store");
    var requestData = req.body;
    var newStore = new StoreModel({
        store_name: requestData.store_name,
        latitude: requestData.latitude,
        longitude: requestData.longitude,
        location: requestData.location,
        rating: requestData.rating,
        tags: requestData.tags,
        reviews: [],
        total_number_of_raters: 1
    });
    newStore.save(function (err, savedStore) {
        if (err) {
            logger.error("%s, %s, %s", __file, __function, __line);
            console.error(err);
            res.statusCode = 500;
            res.send({
                'response_codes': [5000],
                'message': 'Error while inserting new store. please try again'
            });
            return;
        }
        requestData.tags.forEach(function (element, index, array) {
            var newTag = new TagModel({
                tag_name: array[index],
                tag_category: "",
                store_id: savedStore._id,
                upvotes: 1,
                downvotes: 2
            });
            newTag.save(function (err, savedTag) {
                if (err) {

                } else {

                }
            })
        });
        logger.info("%s, %s, %s", __file, __function, __line);
        logger.info("Successfully created new store. New store", savedStore);
        res.send({
            'response_codes': [2001],
            'message': 'New Store successfully created.'
        });
    });
};

exports.updateStoreWithRating = function (req, res, next) {
    logger.info("updating a store a store");
    var requestData = req.body;

    StoreModel.findStoreForStoreId(requestData.store_id, function (err, store) {
        var newRating = (store.rating * store.total_number_of_raters + requestData.rating) / (store.total_number_of_raters + 1);
        store.rating = newRating;
        store.total_number_of_raters = store.total_number_of_raters + 1;
        store.reviews.push(requestData.review);
        store.save(function (err) {
            if (err) {
                res.statusCode = 400;
                res.send({message: "error while updating"});
            }
            else {
                res.statusCode = 200;
                res.send({message: "successfully updated store"});
            }
        });
    });
};

exports.addtags = function (req, res, next) {
    logger.info("Insert tags");
    var requestData = req.body;
    var newStore = new StoreModel({
        store_name: requestData.store_name,
        latitude: requestData.latitude,
        longitude: requestData.longitude,
        location: requestData.location,
        rating: requestData.rating,
        tags: requestData.tags,
        total_number_of_raters: 1
    });
    newStore.save(function (err, savedStore) {
        if (err) {
            logger.error("%s, %s, %s", __file, __function, __line);
            console.error(err);
            res.statusCode = 500;
            res.send({
                'response_codes': [5000],
                'message': 'Error while inserting new store. please try again'
            });
            return;
        }
        requestData.tags.forEach(function (element, index, array) {
            var newTag = new TagModel({
                tag_name: array[index].tags,
                tag_category: array[index].tag_category,
                store_id: savedStore._id,
                upvotes: array[index].upvotes,
                downvotes: array[index].downvotes
            });
            newTag.save(function (err, savedTag) {
                if (err) {

                } else {

                }
            })
        });
        logger.info("%s, %s, %s", __file, __function, __line);
        logger.info("Successfully created new store. New store", savedStore);
        res.send({
            'response_codes': [2001],
            'message': 'New Store successfully created.'
        });
    });
};


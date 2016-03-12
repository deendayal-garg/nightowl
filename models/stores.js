'use strict';
var mongoose = require('mongoose');
var logger = require("winston").loggers.get("logger");
var Schema = mongoose.Schema;

var storeModel = function () {
    var storeSchema = new Schema({
        store_name: String,
        latitude: Number,
        longitude: Number,
        location: String,
        rating: Number,
        tags: Array,
        reviews: Array,
        total_number_of_raters: Number
    }, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}});

    storeSchema.statics.findStore = function (storeName, callback) {
        return this.find({store_name: new RegExp(storeName, "i")}).exec(function (err, store) {
            if (store === null) {
                err = 'EmptyError';
                logger.error("%s, %s, %s", __file, __function, __line);
                logger.error("Database error :", err)
            }
            callback(err, store);
        });

    };

    storeSchema.statics.findTypeAhead = function (storeName, callback) {
        return this.find({store_name: new RegExp(storeName, "i")}).exec(function (err, store) {
            if (store === null) {
                err = 'EmptyError';
                logger.error("%s, %s, %s", __file, __function, __line);
                logger.error("Database error :", err)
            }
            callback(err, store);
        });

    };

    storeSchema.statics.findStoreForStoreId = function (storeId, callback) {
        return this.find({store_id: storeId}).exec(function (err, store) {
            if (store === null) {
                err = 'EmptyError';
                logger.error("%s, %s, %s", __file, __function, __line);
                logger.error("Database error :", err)
            }
            callback(err, store);
        });

    };

    return mongoose.model('Store', storeSchema);
};

module.exports = new storeModel();

'use strict';
var mongoose = require('mongoose');
var logger = require("winston").loggers.get("logger");
var Schema = mongoose.Schema;

var tagModel = function () {
    var tagSchema = new Schema({
        tag_name: String,
        tag_category: String,
        store_id: String,
        upvotes: Number,
        downvotes: Number
    }, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}});

    tagSchema.statics.findStoresForTag = function (tagName, callback) {
        return this.find({tag_name: new RegExp(tagName, "i")}).exec(function (err, stores) {
            if (stores === null) {
                err = 'EmptyError';
                logger.error("%s, %s, %s", __file, __function, __line);
                logger.error("Database error :", err)
            }
            callback(err, stores);
        });

    };

    tagSchema.statics.findTagsForStore = function (storeId, callback) {
        console.log("InsidefindTagsForStore ");
        return this.find({store_id: storeId}).exec(function (err, tags) {
            if (err) {
                err = 'EmptyError';
                logger.error("%s, %s, %s", __file, __function, __line);
                logger.error("Database error :", err);
                callback(err, tags);
            }
            else if (tags === null) {
                err = 'EmptyError';
                logger.error("%s, %s, %s", __file, __function, __line);
                logger.error("Database error :", err);
                callback(null, {});
            }
            else {
                callback(null, tags);
            }
        });

    };


    tagSchema.statics.addtag = function (store, callback) {
        return this.findOne({store_id: storeId}, {}, {sort: {'created_at': -1}}, function (err, store) {
            if (store === null) {
                err = 'EmptyError';
                logger.error("%s, %s, %s", __file, __function, __line);
                logger.error("Database error :", err)
            }
            callback(err, store);
        });

    };

    return mongoose.model('Tags', tagSchema);
};

module.exports = new tagModel();

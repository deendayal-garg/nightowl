/**
 * Created by vivekdogra on 12/13/15.
 */

/**
 * A custom library to establish a database connection
 */
"use strict";
var mongoose = require("mongoose");
/*
 * Mongoose by default sets the auto_reconnect option to true.
 * It is recommended setting socket options at both the server and replica set level.
 * A 30 seconds connection timeout is recommended because it allows for
 * plenty of time in most operating environments.
 */
var options = {
    server: {socketOptions: {keepAlive: 1, connectTimeoutMS: 30000}},
    replset: {socketOptions: {keepAlive: 1, connectTimeoutMS: 30000}}
};

var db = function () {
    return {

        /**
         * Open a connection to the database
         * @param conf
         */
        config: function (conf) {
            mongoose.connect("mongodb://localhost/test", options);
            var db = mongoose.connection;
            db.on("error", console.error.bind(console, "connection error:"));
            db.once("open", function callback() {
                console.log("db connection open");
            });
        }
    };
};

module.exports = db();

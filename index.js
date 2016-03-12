'use strict';

var express = require('express');
var kraken = require('kraken-js');

var db = require('./lib/database.js');
var winston = require('winston');

var options, app;


/*
 * Create and configure application. Also exports application instance for use by tests.
 * See https://github.com/krakenjs/kraken-js#options for additional configuration options.
 */
options = {
    onconfig: function (config, next) {
        /*
         * Add any additional config setup or overrides here. `config` is an initialized
         * `confit` (https://github.com/krakenjs/confit/) configuration object.
         */
        //any config setup/overrides here

        winston.loggers.add('logger', config.get("logger"));
        db.config(config.get('databaseConfig'));
        next(null, config);
    }
};

app = module.exports = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(kraken(options));
app.on('start', function () {
    console.log('Application ready to serve requests.');
    console.log('Environment: %s', app.kraken.get('env:env'));
});

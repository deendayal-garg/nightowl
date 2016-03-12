'use strict';


var storeController = require('../controllers/store');

module.exports = function (server) {


    server.get('/store/search', storeController.getSearchResultForQuery);

    server.get('/store/shops', storeController.getAllShopsForQuery);

    server.post('/store', storeController.addStore);

    server.put('/store/ratenow', storeController.updateStoreWithRating);
};

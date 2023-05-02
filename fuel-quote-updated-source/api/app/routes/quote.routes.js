module.exports = app => {
    const quoteController    = require("../controllers/quote.controller.js");
    const router            = require("express").Router();
    const verify            = require('./verify_token');

    router.post("/", verify, quoteController.quote);

    router.get("/", verify, quoteController.quotes);
    router.post("/calculate", verify, quoteController.getQuote);

    app.use('/api/v0/quote', router);
}

module.exports = app => {
    const authController    = require("../controllers/auth.controller.js");
    const router            = require("express").Router();

    router.post("/register", authController.register);

    router.post("/login", authController.login);

    app.use('/api/v0/auth', router);
}
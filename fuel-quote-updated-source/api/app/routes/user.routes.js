module.exports = app => {
    const userController    = require('../controllers/user.controller');
    const userRouter        =  require("express").Router();
    const verify            = require('./verify_token');

    userRouter.get('/me', verify, userController.me);
    userRouter.put('/update/:id', verify, userController.update_profile);

    app.use('/api/v0/user', userRouter);
}
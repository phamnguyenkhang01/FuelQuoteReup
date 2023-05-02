module.exports = app => {
    require("../routes/auth.routes.js") (app);
    require("../routes/user.routes.js") (app);
    require("../routes/quote.routes.js") (app);
}

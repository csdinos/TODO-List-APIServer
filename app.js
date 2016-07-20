// TODO:  REMOVE multer
//        FINISH JWT
//        PUT USER_ID TO TASKS
//        DO USERTASKS

/**
 * Applications main source code
 *
 */
var express = require("express");

var bodyParser  = require('body-parser');

var app = express();

var port = require("./config.js").port;

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// get an instance of the router for api routes
var apiJwtRoutes = express.Router();
var apiFreeRoutes = express.Router();

var JWTMiddleware = require('./middlewares/JWTMiddleware.js');

// route middleware to verify a token
apiJwtRoutes.use(JWTMiddleware);

var routes = require("./routes/routes.js")(apiJwtRoutes, apiFreeRoutes);

// aply our routes with the prefix 'API'
app.use('/API', apiJwtRoutes);
app.use('/API', apiFreeRoutes);

var server = app.listen(port, function () {
    console.log("Listening on port %s...", server.address().port);
});

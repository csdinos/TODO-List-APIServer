
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
var apiRoutes = express.Router();

// pass all our routes into apiRoutes
var routes = require("./routes/routes.js")(apiRoutes);

// put our routes under /API/
app.use('/API', apiRoutes);

var server = app.listen(port, function () {
    console.log("Listening on port %s...", server.address().port);
});

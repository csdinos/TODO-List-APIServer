
/**
 * Applications main source code
 *
 */
var express = require("express");

var app = express();

var routes = require("./routes/routes.js")(app);

var port = require("./config.js").port;

var server = app.listen(port, function () {
    console.log("Listening on port %s...", server.address().port);
});

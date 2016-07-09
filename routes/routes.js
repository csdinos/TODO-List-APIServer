var appRouter = function(app) {

  // require and initialize multer so as to handle the form-data of the requests
  var multer  = require('multer');
  var upload = multer();

  // require the register module
  var register = require("../controllers/register.js");

    /**
     * Testing route
     */
    app.get("/", function(req, res) {
      res.send("Hello World");
    });

    /**
     * Register route
     * Forms parameters:
     * username (min:4)
     * password (min:6)
     * email (email format)
     */
    app.post("/register", upload.array(), function(req,res){

      // we use the register.js module to handle the request
      register(req,res);
    });

}

module.exports = appRouter;

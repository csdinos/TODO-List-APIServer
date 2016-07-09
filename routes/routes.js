var appRouter = function(app) {

  var multer  = require('multer');

  var upload = multer();

  var register = require("../controllers/register.js");

    app.get("/", function(req, res) {
      res.send("Hello World");
    });

    app.post("/register", upload.array(), function(req,res){
      register(req,res);
    });

}

module.exports = appRouter;

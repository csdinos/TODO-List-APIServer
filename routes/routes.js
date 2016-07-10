var appRouter = function(app) {

  // require and initialize multer so as to handle the form-data of the requests
  var multer  = require('multer');
  var upload = multer();

  // require the register module
  var register = require("../controllers/register.js");

  // require the addTask module
  var addTask = require("../controllers/addTask.js");

    /**
     * Testing route
     */
    app.get("/", function(req, res) {
      res.end("Hello World2");
    });

    /**
     * Register route
     * Forms parameters:
     * username
     * password
     * email (email format)
     */
    app.post("/register", upload.array(), function(req,res){

      // we use the register.js module to handle the request
      register(req,res);
    });


    /**
     * add_task route
     * Form's parameters:
     * taskName
     * taskDescription
     * taskText
     * taskDeadline
     * created_at
     */
    app.post("/add_task", upload.array(), function(req,res){

      // we use the addTask.js module to handle the request
      addTask(req,res);
    });

}

module.exports = appRouter;

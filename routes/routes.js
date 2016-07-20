var appRouter = function(apiJwtRoutes, apiFreeRoutes) {

  // require and initialize multer so as to handle the form-data of the requests
  var multer  = require('multer');
  var upload = multer();

  // require the register module
  var register = require("../controllers/register.js");

  // require the login module
  var login = require("../controllers/login.js");

  // require the addTask module
  var addTask = require("../controllers/addTask.js");

  // require the deleteTask module
  var deleteTask = require("../controllers/deleteTask.js");

    /**
     * Testing route
     */
    apiFreeRoutes.get("/", function(req, res) {
      res.end("Hello World2");
    });

    /**
     * Register route
     * Forms parameters:
     * username
     * password
     * email (email format)
     */
    apiFreeRoutes.post("/register", upload.array(), function(req,res){

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
    apiJwtRoutes.post("/add_task", upload.array(), function(req,res){

      // we use the addTask.js module to handle the request
      addTask(req,res);
    });

    /**
     * delete_task route
     * Form's parameters:
     * task's _id
     * user's _id? prolly not cause task's _id is unique even among users' tasks
     */
    apiJwtRoutes.post("/delete_task", upload.array(), function(req,res){

      // we use the deleteTask.js module to handle the request
      deleteTask(req,res);
    });

    /**
     * user_tasks route
     * Form's parameters:
     * user's _id
     */
    apiJwtRoutes.post("/user_tasks", upload.array(), function(req,res){

      // we use the user_tasks.js module to handle the request
      userTasks(req,res);
    });

    /**
     * login route
     * Form's parameters:
     * email
     * password
     * (not username cause its not unique)
     */
    apiFreeRoutes.post("/login", upload.array(), function(req,res){

      // we use the login.js module to handle the request
      login(req,res);
    });

}

module.exports = appRouter;

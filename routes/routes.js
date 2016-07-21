var appRouter = function(apiRoutes) {

  // require the register module
  var register = require("../controllers/register.js");

  // require the login module
  var login = require("../controllers/login.js");

  // require the addTask module
  var addTask = require("../controllers/addTask.js");

  // require the deleteTask module
  var deleteTask = require("../controllers/deleteTask.js");

  // require the userTasks module
  var userTasks = require("../controllers/userTasks.js");

  // require our middleware for JWT validation
  var JWTMiddleware = require('../middlewares/JWTMiddleware.js');

    /**
     * Testing route
     */
    apiRoutes.get("/", function(req, res) {
      res.end("Hello World2");
    });

    /**
     * Register route
     * Forms parameters:
     * username
     * password
     * email (email format)
     */
    apiRoutes.post("/register", function(req,res){

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
    apiRoutes.post("/add_task", JWTMiddleware, function(req,res){

      // we use the addTask.js module to handle the request
      addTask(req,res);
    });

    /**
     * delete_task route
     * Form's parameters:
     * task's _id
     * user's _id? prolly not cause task's _id is unique even among users' tasks
     */
    apiRoutes.post("/delete_task", JWTMiddleware, function(req,res){

      // we use the deleteTask.js module to handle the request
      deleteTask(req,res);
    });

    /**
     * user_tasks route
     * Form's parameters:
     * user's _id
     */
    apiRoutes.post("/user_tasks", JWTMiddleware, function(req,res){

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
    apiRoutes.post("/login", function(req,res){

      // we use the login.js module to handle the request
      login(req,res);
    });

}

module.exports = appRouter;

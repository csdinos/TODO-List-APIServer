
//requires
var mongo = require('mongodb').MongoClient;

var url = require("../config.js").mongodbURL;

var TaskModel = require("../models/task.js");

/**
 * addTask module for handling requests on /add_task
 * Request should contain the following parameters
 * taskName (min:4, max:30)
 * taskDescription (min:4, max:50)
 * taskText (min:4, max:100)
 * taskDeadline (date)
 * created_at (date)
 */
var addTask = function(req,res) {

  // connect to our mongodb
  mongo.connect(url, function(err, db){

    if (err) throw err;

    // should be in place of the whole function but im too tired now and its late :D
    handle(db,req,res);
  });

}

// export the module
module.exports = addTask;


/**
 * handle - handle addTask request
 *
 */
function handle(db, req, res) {

  // get out tasks collection
  var tasksCollection = db.collection('tasks');

  // get the parameters from the request
  var taskName = req.body.task_name;
  var taskDescription = req.body.task_description;
  var taskText = req.body.task_text;
  var taskDeadline = req.body.task_deadline;
  var created_at = new Date();

  // contruct the task object
  var toBeInsert =
  {
    taskName: taskName,
    taskDescription: taskDescription,
    taskText: taskText,
    taskDeadline: taskDeadline,
    created_at: created_at
  };

  // create a new task model
  var newTask = new TaskModel(toBeInsert);

  // build in mongoose validation
  var error = newTask.validateSync();

  // if there are errors display them and stop RIGHT THERE or there will be violence!
  if(error){

    res.json({add_task: 0, error: error.errors});
  }
  else{

    // TODO: we also need user_id so as to know the task's owner
    // insert the new task
    tasksCollection.insert(toBeInsert, function(err, data) {

      if(err) throw JSON.stringify({err: err});

      // close the conenction
      db.close();

      // return a success code
      res.json({add_task: 1});
    });
  }
}

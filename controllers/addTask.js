
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

  var mongo = require('mongodb').MongoClient;

  // url that we will use to connect to our db
  var url = 'mongodb://localhost:27017/todo';

  // connect to our mongodb
  mongo.connect(url, function(err, db){

    // should be in place of the whole function but im too tired now and its late :D
    handle(err,db,req,res);
  });

}

// export the module
module.exports = addTask;


/**
 * handle - handle addTask request
 *
 */
function handle(err, db, req, res) {

  if (err) throw err;

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

  // TODO: task_deadline and created_at should have the same date form
  // parse the data through a validation
  var validation = validate(toBeInsert);

  // if we do have errors just return a JSON string
  // telling folks that they messed up
  if(validation.hasErrors){

    // TODO: fix the return data so as to be like the succes mode on line 72 (but with errors)
    // bad return type..
    res.send(JSON.stringify(validation.errors));
  }
  // else continue with adding the new task
  else{

    // TODO: we also need user_id so as to know the task's owner
    // insert the new task
    tasksCollection.insert(toBeInsert, function(err, data) {

      if(err) throw JSON.stringify({err: err});

      // close the conenction
      db.close();

      // return a success code
      res.send(JSON.stringify({add_task: 1}));
    });
  }
}

/**
 * validate - validate the forms parameters
 * NOTE: Maybe we should add a folder validation which will contain some modules
 * as many of the API endpoints will require validation
 *
 * @return {String}  either success or the errors
 */
function validate(parameters){

  // cool stuff happen here
  var validator = require('validator');

  var errors = [];
  var hasErrors = false;

  // set the validation rules
  var taskNameRules = { min: 4, max: 30 };
  var taskDescriptionRules = { min: 4, max: 50 };
  var taskTextRules = { min: 4, max: 100 };

  // check taskName
  if( !validator.isLength(parameters.taskName, taskNameRules) ){

    errors.push("Task's name length should be between 4-30 characters");
    hasErrors = true;
  }

  // check taskDescription
  if( !validator.isLength(parameters.taskDescription, taskDescriptionRules) ){

    errors.push("Task's description length should be between 4-50 characters");
    hasErrors = true;
  }

  // check taskText
  if( !validator.isLength(parameters.taskText, taskTextRules) ){

    errors.push("Task's main text length should be between 4-50 characters");
    hasErrors = true;
  }

  //check taskDeadline
  if( !validator.isDate(parameters.taskDeadline) ){

    errors.push("Invalid date for deadline");
    hasErrors = true;
  }

  if(hasErrors){

    // we do have errors so we also return them
    return { hasErrors: hasErrors, errors: errors };
  }else{

    // no errors
    return { hasErrors: hasErrors};
  }
}

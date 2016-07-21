
// requires
var mongo = require('mongodb').MongoClient;

var ObjectID = require('mongodb').ObjectID;

var url = require("../config.js").mongodbURL;

/**
 * deleteTask module for handling requests on /add_task
 * Request should contain the following parameters
 * task's _id
 * user's _id? prolly not cause task's _id is unique even among users' tasks
 */
var deleteTask = function(req,res) {

  // connect to our mongodb
  mongo.connect(url, function(err, db){

    if (err) throw err;

    // should be in place of the whole function but im too tired now and its late :D
    handle(db,req,res);
  });

}

// export the module
module.exports = deleteTask;


/**
 * handle - handle deleteTask request
 *
 */
function handle(db, req, res) {

  // get out tasks collection
  var tasksCollection = db.collection('tasks');

  var error = null;

  // check whether the task_id is passed as a parameter
  if(req.body.task_id == null){
    error = 'task_id is required'
  }

  // if there is not then tell them and stop RIGHT THERE or there will be violence!
  if(error){

    res.json({remove_task: 0, error: error});
  }
  else{

    // get the parameters from the request
    // then pass it to this strange object constructor because thats how mongodb's ids
    // like to chill
    var taskId = new ObjectID(req.body.task_id);
    var user_id = new ObjectID(req.decoded._id); //from decoded token's data

    // contruct the task object
    var toBeRemoved =
    {
      _id: taskId
    };

    // first find the task in order to check if its owned by this user (kids these days)
    tasksCollection.findOne(toBeRemoved, function(err, document) {

      if(err) throw JSON.stringify({err: err});

      // if there is a document with this _id
      if(document){

        //without .toString() even though the value and type of the vars are the same it gives false :/
        if(document.user_id.toString() === user_id.toString()){

          // remove the task since the user has the right to do it
          tasksCollection.remove(toBeRemoved, function(err, data){
            
            removeTask(err,data,db,res);
          });
        }
        // got ya! its not your task -.- stop messing with our lives
        else{
          res.json({remove_task: 0, error: 'permission denied for this task'});
        }
      // else tell them that they have been bad boys
      }else{

        res.json({remove_task: 0, error: 'no task with such id'});
      }

    });

  }
}


function removeTask(err, data, db, res) {

  if(err) throw JSON.stringify({err: err});

  // close the conenction
  db.close();

  // one document removed
  if(data.result.n === 1){

    res.json({remove_task: 1});
  }
  // otherwise its 0
  else{

    res.json({remove_task: 0, error: 'no task with such iddd'});
  }

}

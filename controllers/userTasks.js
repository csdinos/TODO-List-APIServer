
// requires
var mongo = require('mongodb').MongoClient;

var ObjectID = require('mongodb').ObjectID;

var url = require("../config.js").mongodbURL;

/**
 * userTasks module for handling requests on /user_tasks
 * Request should contain the following parameters
 * JWT token
 */
var userTasks = function(req,res) {

  // connect to our mongodb
  mongo.connect(url, function(err, db){

    if (err) throw err;

    // should be in place of the whole function but im too tired now and its late :D
    handle(db,req,res);
  });

}

// export the module
module.exports = userTasks;


/**
 * handle - handle deleteTask request
 *
 */
function handle(db, req, res) {

  // get out tasks collection
  var tasksCollection = db.collection('tasks');

  // get the parameters from the request
  // then pass it to this strange object constructor because thats how mongodb's ids
  // like to chill
  var taskId = new ObjectID(new ObjectID(req.decoded._id));

  // contruct the task object
  var toBeSearched =
  {
    user_id: taskId
  };

  // find the tasks
  tasksCollection.find(toBeSearched).toArray(function(err, documents) {

    if(err) throw JSON.stringify({err: err});

    // close the conenction
    db.close();

    res.json(documents);

  });

}

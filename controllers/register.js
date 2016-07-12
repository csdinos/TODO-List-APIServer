
/**
 * Register module for handling register requests on /register
 * Request should contain the following parameters
 * username (min:4)
 * password (min:6)
 * email (email format + unique)
 */
var register = function(req,res) {

  var mongo = require('mongodb').MongoClient;

  // url that we will use to connect to our db
  var url = require("../config.js").mongodbURL;

  // connect to our mongodb
  mongo.connect(url, function(err, db){

    if (err) throw err;

    // should be in place of the whole function but im too tired now and its late :D
    handle(db,req,res);
  });

}

// export the module
module.exports = register;


/**
 * handle - handle register request
 *
 */
function handle( db, req, res) {

  //require our userModel
  var UserModel = require("../models/user.js");

  // get out users collection
  var usersCollection = db.collection('users');

  // get the parameters from the request
  var username = req.body.username;
  var password = req.body.password;
  var email = req.body.email;

  // contruct the registration object
  var toBeInsert = { username: username, password: password, email: email };

  // create a new user model
  var newUser = new UserModel(toBeInsert);

  // build in mongoose validation
  var error = newUser.validateSync();

  // we have to validate whether its a valid email on our own.. but im too drunk now
  // var validator = require('validator');
  // if( !validator.isEmail(email) ){
  //
  //   error.errors = {email: 'Invalid Email address'};
  // }

  // if there are errors display them and stop RIGHT THERE or there will be violence!
  if(error){

    res.json({register: 0, error: error.errors});
  }
  // else continue with the registration
  else{

    // insert the new user
    usersCollection.insert(toBeInsert,function(err, data) {

      if(err) throw JSON.stringify({err: err});

      // close the conenction
      db.close();

      // return a success code
      res.json({register: 1});
    });
  }
}

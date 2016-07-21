
// requires
var mongo = require('mongodb').MongoClient;

var url = require("../config.js").mongodbURL;

var bcrypt = require('bcrypt');

var UserModel = require("../models/user.js");

var secret = require("../config.js").secret;

// used to create, sign, and verify tokens
var jwt = require('jsonwebtoken');

/**
 * login module for handling login requests on /login
 * login should contain the following parameters
 * password (min:6)
 * email (email format)
 * (not username cause its not unique)
 */
var login = function(req,res) {

  // connect to our mongodb
  mongo.connect(url, function(err, db){

    if (err) throw err;

    // should be in place of the whole function but im too tired now and its late :D
    handle(db,req,res);
  });

}

// export the module
module.exports = login;


/**
 * handle - handle login request
 *
 */
function handle( db, req, res) {

  // get out users collection
  var usersCollection = db.collection('users');

  // get the parameters from the request
  // TODO: parameter validation
  var password = req.body.password;
  var email = req.body.email;

  var error = null;

  // check whether the task_id is passed as a parameter
  if(password == null || email == null){
    error = 'missing parameters'
  }

  // if there are errors display them and stop RIGHT THERE or there will be violence!
  if(error){

    res.json({register: 0, error: error.errors});
  }
  // else continue with the login
  else{

    // find the user
    usersCollection.findOne({ email: email }, function(err, user) {

      if (err) throw err;

      if (!user) {
        res.json({ login: 0, message: 'Authentication failed. Incorrect creds.' });
      } else if (user) {

        // check if password matches
        if (!bcrypt.compareSync(password, user.password)) {
          
          res.json({ login: 0, message: 'Authentication failed. Incorrect creds.' });
        } else {

          // if user is found and password is right
          // create a token
          var token = jwt.sign(user, secret, {
            expiresIn : 60*60*24*7 // expires in 7 days
          });

          // return the information including token as JSON
          res.json({
            login: 1,
            message: 'Enjoy your token!',
            token: token
          });
        }

      }

    });
  }
}

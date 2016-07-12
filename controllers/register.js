
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
  var url = require("./config.js").mongodbURL;

  // connect to our mongodb
  mongo.connect(url, function(err, db){

    // should be in place of the whole function but im too tired now and its late :D
    handle(err,db,req,res);
  });

}

// export the module
module.exports = register;


/**
 * handle - handle register request
 *
 */
function handle(err, db, req, res) {

  if (err) throw err;

  // get out users collection
  var usersCollection = db.collection('users');

  // get the parameters from the request
  var username = req.body.username;
  var password = req.body.password;
  var email = req.body.email;

  // contruct the registration object
  var toBeInsert = { username: username, password: password, email: email };

  // TODO: check that email is unique
  // parse the data through a validation
  var validation = validate(toBeInsert);

  // if we do have errors just return a JSON string
  // telling folks that they messed up
  if(validation.hasErrors){

    // TODO: fix the return data so as to be like the succes mode on line 72 (but with errors)
    // bad return type..
    res.send(JSON.stringify(validation.errors));
  }
  // else continue with the registration
  else{

    // insert the new user
    usersCollection.insert(toBeInsert,function(err, data) {

      if(err) throw JSON.stringify({err: err});

      // close the conenction
      db.close();

      // return a success code
      res.send(JSON.stringify({register: 1}));
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
  var usernameRules = { min: 4, max: 20 };
  var passwordRules = { min: 6, max: 50 };

  // check username
  if( !validator.isLength(parameters.username, usernameRules) ){

    errors.push("Username should be at least 4 characters long");
    hasErrors = true;
  }

  // check password
  if( !validator.isLength(parameters.password, passwordRules) ){

    errors.push("Password should be at least 6 characters long");
    hasErrors = true;
  }

  // check email (TODO: also should BE UNIQUE)
  if( !validator.isEmail(parameters.email) ){

    errors.push("Invalid Email address");
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

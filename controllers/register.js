
/**
 * Register module for handling register requests on /register
 * Request should contain the following parameters
 * username (min:4)
 * password (min:6)
 * email (email format)
 */
var register = function(req,res) {

    var mongo = require('mongodb').MongoClient;

    // url that we will use to connect to our db
    var url = 'mongodb://localhost:27017/todo';

    // connect to our mongodb
    mongo.connect(url, function(err, db) {

      if (err) throw err;

      // get out users collection
      var usersCollection = db.collection('users');

      // get the parameters from the request
      var username = req.body.username;
      var password = req.body.password;
      var password = req.body.email;

      // contruct the registration object
      var toBeInsert = { username: username, password: password, email: email };

      // TODO:
      // check if username is longer that 4 chars,
      // check if password longer that 6 chars
      // and email has an email format
      // checkParameters(toBeInsert);

      // insert the new user
      usersCollection.insert(toBeInsert,function(err, data) {

        if(err) throw JSON.stringify({err: err});

        // close the conenction
        db.close();
      });
    });

  // return a success code
  res.end(JSON.stringify({register: 1}));
}

// export the module
module.exports = register;

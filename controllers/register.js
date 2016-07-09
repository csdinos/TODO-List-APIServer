var register = function(req,res) {

  // var bodyParser = require("body-parser");
  //
  // app.use(bodyParser.json());
  // app.use(bodyParser.urlencoded({ extended: true }));

    var mongo = require('mongodb').MongoClient;

    var url = 'mongodb://localhost:27017/todo';

    mongo.connect(url, function(err, db) {

      if (err) throw err;

      // db gives access to the database
      var usersCollection = db.collection('users');

      var username = req.body.username;

      var password = req.body.password;

      var toBeInsert = { username: username, password: password };

      // insert
      usersCollection.insert(toBeInsert,function(err, data) {

        if(err) throw JSON.stringify({err: err});

        // close the conenction
        db.close();
      });
    });
  res.end(JSON.stringify({register: 1}));
}

module.exports = register;

var register = function(req,res) {

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

        if(err) throw err;

        console.log(JSON.stringify(toBeInsert));

        // close the conenction
        db.close();
      });
    });
  res.end("toBeInsert");
}

module.exports = register;

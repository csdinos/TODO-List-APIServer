
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
var userSchema =  new Schema({
    username:
      {
        type: String,
        required: true,
        minlength: [4, 'Username should be at least 4 characters long'],
        maxlength: [20, 'Username should be no more than 20 characters long'],
      },
    password:
      {
        type: String,
        required: true,
        minlength: [6, 'Password should be at least 6 characters long'],
        maxlength: [50, 'Password should be no more than 50 characters long'],
      },
    email:
      {
        // there is no email type so we should check it on our own :(
        type: String,
        required: true,
      },
});

module.exports = mongoose.model('User', userSchema);

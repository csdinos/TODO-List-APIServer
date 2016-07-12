
var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var taskSchema =  new Schema({
  taskName:
    {
      type: String,
      required: true,
      minlength : [4, 'Task\'s name should be at least 4 characters long'],
      maxlength : [30, 'Task\'s name should be no more than 20 characters long'],
    },
  taskDescription:
    {
      type: String,
      minlength: [4, 'Task\'s description should be at least 4 characters long'],
      maxlength: [50, 'Task\'s description should be no more than 20 characters long'],
    },
  taskText:
    {
      type: String,
      minlength: [4, 'Task\'s main text should be at least 4 characters long'],
      maxlength: [100, 'Task\'s main text should be no more than 20 characters long'],
    },
  taskDeadline:
    {
      type: Date
    },
  created_at:
    {
      type: Date,
      required: true
    }
});

module.exports = mongoose.model('Task', taskSchema);

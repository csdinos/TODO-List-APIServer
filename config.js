var config = {};

config.mongodbURL = 'mongodb://localhost:27017/todo';
config.port = 3000;

// used when we create and verify JSON Web Tokens
config.secret = 'John_Georgiadis_secretly_loves_.NET';

module.exports = config;

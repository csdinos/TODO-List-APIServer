
var secret = require("../config.js").secret;

// used to create, sign, and verify tokens
var jwt = require('jsonwebtoken');

/**
 * Middleware in which we check whether the request has a valid JWT token
 * in order to protect some API endpoints
 */
var JWTMiddleware = function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['Authorization'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, secret, function(err, decoded) {

      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;console.log(decoded);
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({
        success: false,
        message: 'No token provided.'
    });

  }
}

module.exports = JWTMiddleware;

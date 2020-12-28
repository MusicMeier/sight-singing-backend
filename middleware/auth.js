const jwt = require('jsonwebtoken')

module.exports = (request, response, next ) => {
  try {
    const token =  request.header('x-auth-token');
    jwt.verify(token, 'longer-is-better');
    next();
  }
  catch(error){
    response.status(401).json({
      message: "No token cannot authorize"
    })
  }
}
const express = require('express');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const authorize = require('../middleware/auth')
const router = express.Router();
const userSchema = require('../models/users');

router.post('/login', (request, response, next) => {
  let getUser;
  const authFailureErrorMessage = "Auth user Failed";
  userSchema
    .findOne({
      username: request.body.username
    })
        .then((user) => {
          if (!user) throw new Error(authFailureErrorMessage)
          
          getUser = user;
          console.log(getUser)
          return bcrypt.compare(request.body.password, user.password)
        })
        .then((nextResponse) => {
          if (!nextResponse) throw new Error(authFailureErrorMessage)    
          
          let jwtToken = jwt.sign(
            {
              username: getUser.username,
              userId: getUser._id,
            }, 
            "longer-secret-is-better", 
            {
              expiresIn: "1h"
            });
          return response.status(200).json({
            token: jwtToken,
            expiresIn: 3600,
            msg: getUser
          });
        })
      .catch((err) => {
        return response.status(401).json({
          message: "Auth User Failed"
        });
    });
});

router.post("/signup", (request, response, next) => {
  // const salt = bcrypt.genSalt(10);
  // console.log(request.body.users.password) 
  bcrypt.hash(request.body.password, 10).then((hash) => {
    const user = new userSchema({
      username: request.body.username,
      email: request.body.email,
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      password: hash,
    });
    user.save().then((resultResponse) => {
      response
        .status(201)
        .json({
          message: 'User created',
          result: resultResponse
        })
        // .catch((error) => {
        //   response.status(500).json({
        //     message: error.message
        //   });
        // });
    });
  });
});

router.route('/all-user').get(authorize, (request, response) => {
  userSchema.find((error, response) => {
    if (error) {
      return next(error)
    }
    response.status(200).json(response)
  })
})

module.exports = router
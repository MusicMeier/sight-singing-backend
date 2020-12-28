const express = require('express');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const authorize = require('../middleware/auth')
const router = express.Router();
const userSchema = require('../models/users');

router.post('/login', (request, response, next) => {
  let getUser;
  userSchema
    .findOne({
      userName: request.body.userName
    })
        .then((user) => {
          if (!user) {
            return response.status(401).json({
              message: "Auth user Failed"
            })
          }
          getUser = user;
          console.log(getUser)
          return bcrypt.compare(request.body.password, user.password)
        })
        .then((nextResponse) => {
          console.log('penny', nextResponse)
          if (!nextResponse) {
            return response.status(401).json({
              message: "Auth Failed"
            });     
          }
          let jwtToken = jwt.sign(
            {
              userName: getUser.userName,
              userId: getUser._id,
            }, 
            "longer-secret-is-better", 
            {
              expiresIn: "1h"
            });
            console.log(jwtToken)
          return response.status(200).json({
            token: jwtToken,
            expiresIn: 3600,
            msg: getUser
          });
        })
      .catch(err => {
        return response.status(401).json({
          message: 'Auth fail for jwt'
        });
    });
});

router.post("/signup", (request, response, next) => {
  // const salt = bcrypt.genSalt(10);
  // console.log(request.body.users.password) 
  bcrypt.hash(request.body.users.password, 10).then((hash) => {
    const user = new userSchema({
      userName: request.body.users.userName,
      email: request.body.users.email,
      firstName: request.body.users.firstName,
      lastName: request.body.users.lastName,
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
const express = require('express');
const router = express.Router();

//User & UserSession models
const User = require('../../models/User');
const UserSession = require('../../models/UserSession');

// @route POST api/account/signup
// @desc Sign up
// @access Public
router.post('/signup', (req, res, next) => {
  const {
    firstName,
    lastName,
    password
  } = req.body;
  let {
    email
  } = req.body;

  if(!firstName) {
    return res.send({
      success: false,
      message: 'Error: Missing First name.'
    });
  }
  if(!lastName) {
    return res.send({
      success: false,
      message: 'Error: Missing Last name.'
    });
  }
  if(!email) {
    return res.send({
      success: false,
      message: 'Error: Missing Email.'
    });
  }
  if(!password) {
    return res.send({
      success: false,
      message: 'Error: Missing Password.'
    });
  }

  email = email.toLowerCase();

  // Steps:
  //1. Verify email doesn't exist
  //2. Save
  User.find({
    email: email
  }, (err, previousUsers) => {
    if(err) {
      return res.send({
        success: false,
        message: 'Error: Server error'
      });
    } else if(previousUsers.length > 0) {
      return res.send({
        success: false,
        message: 'Error: Account already exist.'
      });
    }

    //Save the new user
    const newUser = new User();

    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.email = email;
    newUser.password = newUser.generateHash(password);
    newUser.save((err, user) => {
      if(err) {
        return res.send({
          success: false,
          message: 'Error: Server error'
        });
      }
      return res.send({
        success: true,
        message: 'Signed up'
      });
    });

  });

});

// @route POST api/items/signin
// @desc Sign in
// @access Public
router.post('/signin', (req, res, next) => {
  const {
    password
  } = req.body;
  let {
    email
  } = req.body;

  if(!email) {
    return res.send({
      success: false,
      message: 'Error: Missing Email.'
    });
  }
  if(!password) {
    return res.send({
      success: false,
      message: 'Error: Missing Password.'
    });
  }

  email = email.toLowerCase();

  User.find({
    email: email
  }, (err, users) => {
    if(err) {
      return res.send({
        success: false,
        message: 'Error: Server error'
      });
    }
    if(users.length != 1) {
      return res.send({
        success: false,
        message: 'Error: Invalid'
      });
    }

    const user = users[0];
    if(!user.validPassword(password)) {
      return res.send({
        success: false,
        message: 'Error: Invalid'
      });
    }

    //Otherwise correct user
    const newUserSession = new UserSession();
    newUserSession.userID = user._id;
    newUserSession.save((err, doc) => {
      if(err) {
        return res.send({
          success: false,
          message: 'Error: Server error'
        });
      }
      return res.send({
        success: true,
        message: 'Valid sign in',
        token: doc._id
      });

    });
  });
});

// @route GET api/items/verify
// @desc Verify
// @access Public
router.get('/verify', (req, res, next) => {
  //Get the token
  const { token } = req.query;
  //?token=test

  //Verify the token is one of a kind and it's not deleted
  UserSession.find({
    _id: token,
    isDeleted: false
  }, (err, sessions) => {
    if(err) {
      return res.send({
        success: false,
        message: 'Error: Server error'
      });
    }

    if(sessions.length != 1) {
      return res.send({
        success: false,
        message: 'Error: Invalid'
      });
    }else{
      return res.send({
        success: true,
        message: 'Verified'
      });
    }
  })

});

// @route GET api/items/logout
// @desc Log out
// @access Public
router.get('/logout', (req, res, next) => {
  //Get the token
  const { token } = req.query;
  //?token=test

  //Verify the token is one of a kind and it's not deleted
  UserSession.findOneAndUpdate({
    _id: token,
    isDeleted: false
  }, {
    $set: { isDeleted: true }
  }, null, (err, sessions) => {
    if(err) {
      return res.send({
        success: false,
        message: 'Error: Server error'
      });
    }

    return res.send({
      success: true,
      message: 'Deleted'
    });


  })

});


module.exports = router;

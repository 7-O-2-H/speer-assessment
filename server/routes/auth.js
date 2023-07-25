const express = require('express');
const router = express.Router();
const authQueries = require('../db/queries/auth');
const cookieSession = require("cookie-session");

//bcrypt

const bcrypt = require("bcrypt");

/* GET auth  */

router.get('/auth/login', function(req, res) {
  const user_id = req.session.user_id;
  if (user_ud) {
    res.send("You are already logged in.")
  }
});

router.post('/auth/login', function(req, res) {
  
  const {user, password} = req.body;
  
  const hashedPassword = bcrypt.hashSync(password, 10);
  
  authQueries.getUserByuser(user)
  .then(data => {
    if (!data[0]) {
      return res.send([false, `Error: user not in database: ${user}`]);
    }

    if (hashedPassword != data[0].password) {
      return res.send([false, 'Error: Your password is incorrect!']);
    }

    //set user
    req.session.user_id = data[0].id;
    return res.json([true, req.session.user_id]);
  });
 
});

router.get('/auth/signup', function(req, res) {
  
})

router.post('/auth/signup', function(req, res) {

  const hashedPassword = bcrypt.hashSync(password, 10);

  newUser = {
    name: req.body.name,
    user: req.body.user,
    password: hashedPassword
  }

  
  //Check if user already exists
  authQueries.getUserByuser(newUser.user).then(data => {
    if (data[0]) {
      return res.send([false, 'Error: this e-mail already in our database.']);
    };
  });

  //Add new user
  authQueries.addUser(newUser).then(data => {
    req.session.user_id = data[0].id;
    return res.send([true, req.session.user_id]);
  })

});

module.exports = router;
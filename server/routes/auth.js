const express = require('express');
const router = express.Router();
const authQueries = require('../db/queries/auth');
const cookieSession = require("cookie-session");

//bcrypt

const bcrypt = require("bcrypt");

/* GET auth  */

router.get('/auth/login', function(req, res) {
  const user_id = req.session.user_id;
  if (user_id) {
    res.send("You are already logged in.")
  }
  res.render("auth_login", user_id);
});

router.post('/auth/login', function(req, res) {
  
  const {user, password} = req.body;
  
  const hashedPassword = bcrypt.hashSync(password, 10);
  
  authQueries.getUserByUsername(user)
  .then(data => {
    if (!data[0]) {
      return res.send(`Error: user not in database: ${user}`);
    }

    if (password != data[0].password) {
      return res.send([false, 'Error: Your password is incorrect!', data]);
    }

    //set user
    
    req.session.user_id = data[0].id;
    res.redirect('/notes');
  });
 
});

router.get('/auth/signup', function(req, res) {
  const user_id = req.session.user_id;
  if (user_id) {
    res.send("You are already logged in.")
  }
  res.render("auth_signup", user_id);
});

router.post('/auth/signup', function(req, res) {

  const password = req.body.password;

  const hashedPassword = bcrypt.hashSync(password, 10);

  newUser = {
    user: req.body.user,
    password: hashedPassword
  }
  
  //Check if user already exists
  authQueries.getUserByUsername(newUser['user']).then(data => {
    if (data[0]) {
      return res.send([false, 'Error: this user is already in our database.']);
    };
  });

  //Add new user
  authQueries.addUser(newUser).then(data => {
    return res.send(data);
  })

});

module.exports = router;
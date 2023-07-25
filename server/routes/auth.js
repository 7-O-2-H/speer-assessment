const express = require('express');
const router = express.Router();
const authQueries = require('../db/queries/auth');
const cookieSession = require("cookie-session");
app.use(cookieSession({
  name: 'session',
  keys: ["key1", "key2"],

  maxAge: 24 * 60 * 60 * 1000
}));

//bcrypt

const bcrypt = require("bcryptjs");

/* GET auth  */
router.get('/auth', function(req, res) {
  authQueries.getAllUsers()
  .then(data => {
    res.json(data);
  })
});

router.get('/auth/login', function(req, res) {
});

router.post('/auth/login', function(req, res) {
  
  const {user, password} = req.body;
  
  const hashedPassword = bcrypt.hashSync(password, 10);
  
  authQueries.getUserByuser(user)
  .then(data => {
    if (!data[0]) {
      return res.json([false, `Error: user not in database: ${user}`]);
    }

    if (password != data[0].password) {
      return res.json([false, 'Error: Your password is incorrect!']);
    }

    //set user
    req.session.user_id = data[0].id;
    return res.json([true, req.session.user_id]);
  });

 
});

router.get('/auth/signup', function(req, res) {
  console.log('hello');
})

router.post('/auth/signup', function(req, res) {

  newUser = {
    name: req.body.name,
    user: req.body.user,
    password: req.body.password
  }

  //Check if user already exists
  authQueries.getUserByuser(newUser.user).then(data => {
    if (data[0]) {
      return res.json([false, 'Error: this e-mail already in our database.']);
    };
  });

  //Add new user
  authQueries.addUser(newUser).then(data => {
    req.session.user_id = data[0].id;
    return res.json([true, req.session.user_id]);
  })

});

module.exports = router;
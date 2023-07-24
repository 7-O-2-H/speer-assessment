const express = require('express');
const router = express.Router();
const authQueries = require('../db/queries/auth');
const { pool } = require('../db/queries/pool');

//test user
// const auth = ["josh"];

/* GET auth listing. */
router.get('/', function(req, res) {
  authQueries.getAllUsers()
  .then(data => {
    res.json(data);
  })
});

module.exports = router;


router.post('/login', function(req, res) {
  
  const username = req.body.username;
  const password = req.body.password;
  
  //check if user exists

  req.session.user_id = null;
  
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

router.post('/signup', function(req, res) {

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
const { pool } = require('../queries/pool');
const db = require('../../configs/db.config');

const getUserByUsername = username => {
  return db.query(`SELECT * FROM users WHERE users.username = $1`, [username])
  .then(data => {
    return data.rows;
  });
};

const getAllUsers = () => {
  return db.query(`SELECT * FROM users`)
  .then(data => {
    return data.rows;
  });
};

const addUser = (user) => {
  const values = [user.user, user.password];

  return pool
    .query(`INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *;`, values)
    .then((result) => {
      return result.rows;
    })
    // .catch((err) => {
    //   return (['add user error:', err.message, values]);
    // });
};

module.exports = { getUserByUsername, addUser, getAllUsers }
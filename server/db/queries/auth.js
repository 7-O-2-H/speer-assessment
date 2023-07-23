const { pool } = require('../queries/pool');
const db = require('../../configs/db.config');\

const getUserByUsername = username => {
  const username = username;
  return db.query(`SELECT * FROM auth WHERE auth.username = $1`, [username])
  .then(data => {
    return data.rows;
  });
};

const addUser = (user) => {
  const values = [user.name, user.password, ''];
  return pool
    .query(`INSERT INTO auth (username, password) VALUES ($1, $2) RETURNING *;`, values)
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log('add user error;', err.message);
      return null;
    });
};

module.exports = { getUserByUsername, addUser }
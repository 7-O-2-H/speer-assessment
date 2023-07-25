//const bcrypt = require("bcryptjs");

const verifyUser =  (templateVars) => {
  let usersURLs = {};
  const currentUser = templateVars.user_id.id;
  for (const url in urlDatabase) {
    if (urlDatabase[url].userID === currentUser) {
      usersURLs[url] = urlDatabase[url];
    }
  }
  return usersURLs;
};

const findUser = function(email, users) {
  for (let userID in users) {
    if (email === users[userID].email) {
      return users[userID];
    }
  }
  return false;
};
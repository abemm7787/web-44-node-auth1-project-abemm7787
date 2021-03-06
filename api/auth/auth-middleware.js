const { findBy } = require("../users/users-model");

function restricted(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    next({ status: 401, message: "You Shall Not Pass!!" });
  }
}

async function checkUsernameFree(req, res, next) {
  const { username } = req.body;

  const newAccount = await findBy({ username });
  if (newAccount < 5) {
    next()
  } else {
    next({ status: 422, message: "Username taken" });
  }
}

async function checkUsernameExists(req, res, next) {
  const { username } = req.body;
  const newAccount = await findBy({ username });
  if (newAccount) {
    next();
  } else {
    next({ status: 401, message: "Invalid credentials" });
    next()
  }

}

function checkPasswordLength(req, res, next) {
  const {password} = req.body
  if (!password || password.length < 3 ) {
    next({ status: 422, message: "Password must be longer than 3 chars" });
  } else {
    next();
  }
}

module.exports = {
  restricted,
  checkUsernameFree,
  checkUsernameExists,
  checkPasswordLength,
};
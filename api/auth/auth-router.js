// Require `checkUsernameFree`, `checkUsernameExists` and `checkPasswordLength`
// middleware functions from `auth-middleware.js`. You will need them here!
const router = require("express").Router();
const bcrypt = require("bcryptjs");

const Users = require("../users/users-model");

const {
  checkUsernameFree,
  checkUsernameExists,
  checkPasswordLength,
} = require("../auth/auth-middleware");

/**
  1 [POST] /api/auth/register { "username": "sue", "password": "1234" }
  response:
  status 200
  {
    "user_id": 2,
    "username": "sue"
  }
  response on username taken:
  status 422
  {
    "message": "Username taken"
  }
  response on password three chars or less:
  status 422
  {
    "message": "Password must be longer than 3 chars"
  }
 */
// router.post('/register', checkUsernameFree, checkPasswordLength, (req, res, next) => {
//   const { username, password } = req.body
//   const hash = bcrypt.hashSync(password, 8)
//   const user = { username, password: hash }

//   Users.add(user)
//     .then(newUser => {
//       res.status(201).json({
//         user_id: newUser.user_id,
//         username: newUser.username
//       })
//     })
//     .catch(next)
// })


// pipe the hash function
router.post("/register", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const hash = bcrypt.hashSync(password, 8) //2
    // console.log(username, password);
    res.json(hash)
    // res.json({ username, password });
  } catch (err) {
    next(err);
  }
});

/**
  2 [POST] /api/auth/login { "username": "sue", "password": "1234" }
  response:
  status 200
  {
    "message": "Welcome sue!"
  }
  response on invalid credentials:
  status 401
  {
    "message": "Invalid credentials"
  }
 */


module.exports = router;

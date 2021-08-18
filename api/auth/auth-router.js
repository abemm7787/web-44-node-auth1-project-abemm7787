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

router.post(
"/register",
  checkUsernameFree,
  checkPasswordLength,
  async (req, res, next) => {
    try {
      const { username, password } = req.body; //1    // request body username and password from the clients side
      const hash = bcrypt.hashSync(password, 8); //2   // genearting hash
      const newAccount = await Users.add({ username, password: hash })  //releases hash and username to the underworld
      res.status(201).json(newAccount); //responds  to the front end
    } catch (err) {
      next(err);
    }
  }
);








router.post("/login", checkUsernameExists, (req, res, next) => {


  
  const { username, password } = req.body;
  Users.findBy({ username })
    .then(([user]) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.user = user;
        res.json({
          message: `welcome ${user.username}`,
        });
      } else {
        next({
          status: 401,
          message: "Invalid credentials",
        });
      }
    })
    .catch(next);
});

router.get("/logout", (req, res, next) => {
  if (req.session.user) {
    req.session.destroy((err) => {
      if (err) {
        next({ message: "logout failed" });
      } else {
        res.json({ status: 200, message: "logged out" });
      }
    });
  } else {
    next({ status: 200, message: "no session" });
  }
});

module.exports = router;

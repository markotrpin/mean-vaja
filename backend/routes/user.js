const express = require("express");
const UserController = require("../controllers/user");

const router = express.Router();

/* CREATE NEW USER */

router.post("/signup", UserController.createUser);


/* LOGIN USER */

router.post("/login", UserController.userLogin);

module.exports = router;

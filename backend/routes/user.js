const express = require("express");
const { register, login, register_participant , logout , myProfile , getAllUsers , getMyDebates} = require("../controllers/user");
const { isAuthenticated } = require("../middlewares/auth");
const router = express.Router();
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/register_participant").post(isAuthenticated,register_participant);
router.route("/logout").get(logout);
router.route("/me").get(isAuthenticated, myProfile);
router.route("/users").get(isAuthenticated, getAllUsers);
router.route("/my_debates").get(isAuthenticated, getMyDebates);
// We can also make functions related to get my and any user profile 
module.exports = router

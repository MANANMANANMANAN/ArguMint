const { createDebate, keep_view, like_debate, like_message , comment_debate ,all_debates , finishDebate} = require("../controllers/debate");
const express = require("express");
const { isAuthenticated } = require("../middlewares/auth");
const router = express.Router();
router.route("/debate/upload").post(isAuthenticated,createDebate);
router.route("/debate/keep_view").post(isAuthenticated,keep_view);
router.route("/debate/like_debate").post(isAuthenticated,like_debate);
router.route("/debate/like_message").post(isAuthenticated,like_message);
router.route("/debate/comment").post(isAuthenticated,comment_debate);
router.route("/debates").get(isAuthenticated,all_debates);
router.route("/debate/finish").post(isAuthenticated,finishDebate);
module.exports = router
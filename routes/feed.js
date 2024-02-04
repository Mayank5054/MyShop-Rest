const express = require("express");
const router = express.Router();
const feedController = require("../controllers/feed");
const isAuth = require("../controllers/isAuth");
// GET /feed/posts
router.get("/posts",isAuth,feedController.getPosts);

// POST /feed/posts
router.post("/posts",feedController.postPosts);

module.exports = router;
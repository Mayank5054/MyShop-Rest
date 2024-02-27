const express = require("express");
const router = express.Router();
const feedController = require("../controllers/feed");
const feedController2 = require("../controllers/feed2");
const isAuth = require("../controllers/isAuth");
// GET /feed/posts
router.get("/products",feedController2.getAllProducts);
router.post("/addToCart",feedController.addToCart);
router.get("/products/:id",feedController2.getProduct);
router.post("/createProduct",feedController2.createProduct);
router.post("/updateProduct/:id",feedController2.updateProduct);

router.post("/deleteProduct/:id",feedController2.deleteProduct);
// POST /feed/posts
// router.post("/posts",feedController.postPosts);

module.exports = router;
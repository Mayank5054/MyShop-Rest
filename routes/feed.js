const express = require("express");
const router = express.Router();
const feedController = require("../controllers/feed");
const feedController2 = require("../controllers/feed2");
const isAuth = require("../controllers/isAuth");
// GET /feed/posts
router.get("/products",feedController2.getAllProducts);
// router.post("/addToCart",feedController.addToCart);
router.get("/products/:id",feedController2.getProduct);
router.post("/createProduct",feedController2.createProduct);
router.post("/updateProduct/:id",feedController2.updateProduct);
router.post("/deleteProduct/:id",feedController2.deleteProduct);
router.post("/addToCart",feedController2.addProductToCart);
router.post("/getUserCart",feedController2.getUserCart);
router.post("/deleteCartItem",feedController2.deleteCartItem);
router.post("/placeOrder",feedController2.placeOrder);
router.post("/getUserOrders",feedController2.getAllUserOrders);
router.post("/getReset",feedController2.getResetPassword);
router.post("/resetPassword",feedController2.changePassword);
router.get("/form",feedController2.getForm);
router.post("/uploadFile",feedController2.uploadFile);
// POST /feed/posts
// router.post("/posts",feedController.postPosts);

module.exports = router;
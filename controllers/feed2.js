const Product = require("../models/Product");
const User = require("../models/User");
const Order = require("../models/Order");
const crypto = require("crypto");
exports.getAllProducts = (req,res,next) => {
    Product.find()
    .populate("userId","cart")
    .then(
        Products => { 
               res.status(201).json({
                    Products:Products,
                    "status":201,
                    "message":"User Fetched Successfully"
                });
        }
    ).catch(err1 => {
        const err = new Error(err1);
        err.statusCode = 200;
        err.message = "No use Data Found";
        throw next(err);
    })
}


exports.getProduct = (req,res,next) => {
    console.log(req.params.id);
    Product.findById(req.params.id).then((product)=>{
        console.log(product);
        res.status(200).json({
            ...product._doc,
            "message":"Product fetched successfully"
        })
    })
}

exports.createProduct = (req,res,next) => {
    console.log(req.user);
    console.log(req.body);
    const product  = new Product({
        title:req.body.title,
        price:req.body.price,
        image:req.body.image,
        userId:req.user
    })
    product.save().then((result)=>{
console.log(result);
    })
}

exports.deleteProduct = (req,res,next) => {
    Product.findByIdAndDelete(req.params.id).then(
        (result)=>{
            console.log(result);
    })
}

exports.updateProduct = (req,res,next) => {
    Product.findById(req.params.id).then(
        (result) => {

            result.title = req.body.title;
            result.price = req.body.price;
            result.image = req.body.image;
            result.userId = req.body.userId;

            result.save().then((ree)=>{
                console.log(ree);
            })
        }
    )
}

exports.addProductToCart = (req,res,next) => {
    Product.findById(req.body.id)
    .then(product => {
        if(product){
            console.log(product);
            // User.addToCart(product)

            req.user.addToCart(product)
            .then(result => {
                console.log(result);
            })
        }
    })
}

exports.getUserCart = (req,res,next) => {
    req.user
    .populate("cart.items.productId","title price -_id userId")
    .then((products) => {
        console.log("cart fetched");
        console.log(products.cart.items);
    })
}

exports.deleteCartItem = (req,res,next) => {
    Product.findById(req.body.id)
    .then( product => {
        console.log(product);
        req.user.deleteCartItem(product)
        .then(result => {
            console.log(result);
        })
    })
}

exports.placeOrder = (req,res,next) => {
    req.user
    .populate("cart.items.productId")
    .then(user => {
        let total = 0;
        const items = user.cart.items.map(e =>{
            console.log(e);
            total += e.productId.price;
            return {productId:e._id,quantity:e.quantity}
        });
        console.log(items , total);
        const order = new Order({
            items:items,
            totalAmount:total,
            userId:req.user
        });

        return order.save()
    })
    .then (result => {
        req.user.cart.items = [];
        console.log(result);
        return req.user.save();
        
    })
    .then((user)=>{
        console.log("user  cart cleared");
        console.log(user);
    })
};


exports.getAllUserOrders = (req,res,next) => {
    Order.find()
    .where("userId")
    .equals(req.user._id)
    .then(
        orders => {
            console.log(orders);
        }
    )
}

exports.getResetPassword = (req,res,next) => {
    User.findOne({email:req.body.email})
    .then((user) => {
        const userData = user;
        crypto.randomBytes(32,(err,buffer)=>{
            if(err){
                console.log(err);
            }
            else{
                const token = buffer.toString("hex");
                userData.otp = token;
                userData.valid = Date.now() + 120000;
                console.log("user" , userData);
                userData.save().then((result)=>{
console.log(result);
                })
            }
        })
        
})
}

exports.changePassword = (req,res,next) => {
    User.findOne({
        $and:[{email:req.body.email},
        {otp:req.body.otp}]
    })
    .then((user)=>{
        console.log(user);
        // console.log(user.valid > Date.now());
if(user && user.valid > Date.now()){
    user.password = req.body.password;
    return user.save();
}
    })
    .then((result) => {
        console.log(result);
    })
}

exports.getForm = (req,res,next) => {
    res.render('./../views/fileUpload',{
        title:"Hello,world"
    })
}

exports.uploadFile = (req,res,next) => {
console.log(req.file);
res.render("./../views/showUploadedImage",{
    url:req.file.path
})
}
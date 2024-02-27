const Product = require("../models/Product");

exports.getAllProducts = (req,res,next) => {
    Product.find().then(
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
    console.log(req.body);
    const product  = new Product({
        title:req.body.title,
        price:req.body.price,
        image:req.body.image,
        userId:req.body.userId
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
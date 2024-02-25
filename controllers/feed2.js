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
    const id = req.body.id;
}
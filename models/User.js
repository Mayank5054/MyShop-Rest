const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user = new Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    cart:{
        items:[{
            productId:{
                type:Schema.Types.ObjectId,
                ref:"Product",
                required:true
            },
            quantity:{
                type:Number,
                required:true
            }
        }]
    }
})

// user.methods.addProductIntoCart = function(product){
//     const findIndex = this.cart.items.findIndex(e => {return e.productId.toString() === product._id.toString()});
//     if(findIndex >=0 ){
//         this.cart.items[findIndex].quantity = this.cart.items[findIndex].quantity + 1;
//         return this.save();
//         };
    
//     this.cart.items.push({
//         productId:product._id,
//         quantity:1
//     });
//     return this.save().then();
// }

user.methods.addToCart = function(product) {
    const index = this.cart.items.findIndex(cp => {return cp.productId.toString() == product._id.toString()});
    if(index >=0 ){
        this.cart.items[index].quantity = this.cart.items[index].quantity + 1;
    }
    else{
        this.cart.items.push({
            productId:product,
            quantity:1
        })
    }
    return this.save()
};

user.methods.deleteCartItem = function(product){
    const cart = this.cart.items.filter(cp => {return cp.productId.toString() !== product._id.toString()});
    this.cart.items = cart;
    return this.save();
}
module.exports = mongoose.model("User",user);
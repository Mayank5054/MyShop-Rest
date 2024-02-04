const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const isAuth = (req,res,next) =>{
    let token = req.get("Authorization");
    token = token.split(" ")[1];
    if(token){
        console.log(token);
        try{
       const decoded = jwt.verify(token,"Mayank.5354");
       console.log(decoded);
       User.findOne({
           email:"mayank"
       }).then(
           user => {
               if(user!=null){
                  bcrypt.compare(decoded.password,user.password).then(
                       result => {
                        // console.log(result,user.password);
                           
                               console.log("user authenticated succsed");
                               next();
                           console.log(result);
                       }
                   )
                   .catch( err => {
                    console.log("wrong password");
                   })
               }
               else {
                   res.json({
                       suc:"failed"
                   })
               }
           }
       )
        }
        catch(error){
            res.json({
                "cur":"token invalid"
            })
        }
    }
    else{
        res.status(400).json({
            error:"Authorization token missing"
        })
    }
}

module.exports = isAuth;
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
exports.postLogin = (req,res,next) => {
    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({
        email:email,
    })
    .then(user => {
        console.log(user);
        if(user){
            bcrypt.compare(password,user.password)
            .then(same => {
                if(same){
                    const token = jwt.sign({
                        email:email,
                        password:password,
                    },"mayank.5354",{
                        expiresIn:'1h'
                    })
                    res.status(200).json({token:token,message:"login corrected"}); 
                }
                else{
                    res.status(401).json({"fail":"login not corrected"}); 
                }   
            })
        }
        else{
            res.status(401)
            .json({
                "fail":"enter valid credentials"
            })
        }
        
    })
}
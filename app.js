const express = require("express");
const feedRoutes = require("./routes/feed");
const loginRoutes = require("./routes/login");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const mongoConnectFunction = require("./utils/mongooseConnection");
const User = require("./models/User");
const path = require("path");
const multer = require("multer");
const storageObj = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null,"uploads/");
    },
    filename:(req,file,cb) => {
        cb(null,new Date().toISOString().replace(/:/g, '-')
        + "-"
        + file.originalname );
    }
})
// This creates a connection to the Socket.IO server

app.set("view engine","ejs");
app.set('views', path.join(__dirname, 'views'));
app.use("/uploads",express.static(
    
    path.join(__dirname,"uploads")
    
    ));
app.use(bodyParser.urlencoded({extended:true}))
app.use(multer({storage:storageObj}).single("file1"));
app.use(bodyParser.json());

// app.use((req,res,next) => {
//     res.setHeader("Access-Control-Allow-Origin","*");
//     res.setHeader("Access-Control-Allow-Methods","GET");
//     res.setHeader("Access-Control-Allow-Headers","Content-Type,Authorization");
//     next();
// })
app.use((req,res,next)=> {
    User.findById("65e0c1803e97474f5fd9d9a5")
    .then( (user)=>{
        req.user = user;
        next();
    } )
    .catch((err)=>{
console.log(err);
    })
});
app.use("/feed", feedRoutes);
// app.use(loginRoutes);
// app.use((err,req,res,next) => {
//     res.status(err.statusCode).json({
//         "message":err.message
//     })
// });

mongoConnectFunction()
    .then(result => {
        User.findOne().then(
            (user) => {
                if (!user) {
                    const user = new User({
                        email: "mayanksheladiya49@gmail.com",
                        password: "Mayank.5354",
                        otp:null,
                        valid:null,
                        cart: []
                    });
                    return user.save()
                }
            }
        )
            .then(result => {
                if (result) {
                    console.log(result);
                }
            })
        app.listen(5354);
        console.log("server started");
    });


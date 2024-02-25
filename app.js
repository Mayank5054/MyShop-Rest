const express=require("express");
const feedRoutes = require("./routes/feed");
const loginRoutes = require("./routes/login");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const mongoConnectFunction = require("./utils/mongooseConnection");
 // This creates a connection to the Socket.IO server
// app.use(bodyParser.json());
// app.use((req,res,next) => {
//     res.setHeader("Access-Control-Allow-Origin","*");
//     res.setHeader("Access-Control-Allow-Methods","GET");
//     res.setHeader("Access-Control-Allow-Headers","Content-Type,Authorization");
//     next();
// })

app.use("/feed",feedRoutes);
// app.use(loginRoutes);
app.use((err,req,res,next) => {
    res.status(err.statusCode).json({
        "message":err.message
    })
});

mongoConnectFunction()
.then(result => {
    app.listen(5354);
    console.log("server started");
});


const express=require("express");
const feedRoutes = require("./routes/feed");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Methods","GET");
    res.setHeader("Access-Control-Allow-Headers","Content-Type,Authorization");
    next();
})
app.use("/feed",feedRoutes);

app.listen(5354,(req,res,next) => {
    console.log("server started !");
});